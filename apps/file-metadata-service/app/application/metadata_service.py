import hashlib
import tempfile
import uuid
from datetime import datetime, timezone
from pathlib import Path

import magic
from fastapi import UploadFile

from app.config import MAX_FILE_SIZE_BYTES, TEMP_DIR
from app.domain.errors import FileTooLargeError
from app.domain.extractor import MetadataExtractor
from app.domain.models import MetadataResponse, SystemMetadata
from app.domain.sanitizers import sanitize_file_name, strip_nul
from app.infrastructure.exiftool_extractor import ExifToolExtractor
from app.infrastructure.metadata_repository import MetadataRepository


class FileMetadataService:
    def __init__(
        self,
        repository: MetadataRepository,
        extractor: MetadataExtractor | None = None,
    ):
        self.repository = repository
        self.extractor = extractor or ExifToolExtractor()

    def process(self, upload: UploadFile) -> MetadataResponse:
        original_name, extension = sanitize_file_name(upload.filename or "unnamed")
        digest = hashlib.sha256()
        size = 0
        embedded_metadata = {}
        errors = []

        Path(TEMP_DIR).mkdir(parents=True, exist_ok=True)
        temp_path = None

        try:
            with tempfile.NamedTemporaryFile(
                prefix="upload_",
                suffix=extension or "",
                dir=TEMP_DIR,
                delete=False,
            ) as temp_file:
                temp_path = Path(temp_file.name)

                while chunk := upload.file.read(1024 * 1024):
                    size += len(chunk)
                    if size > MAX_FILE_SIZE_BYTES:
                        raise FileTooLargeError(
                            f"File exceeds the maximum size of "
                            f"{MAX_FILE_SIZE_BYTES} bytes."
                        )
                    digest.update(chunk)
                    temp_file.write(chunk)

            mime_type = magic.from_file(str(temp_path), mime=True)

            try:
                embedded_metadata = strip_nul(self.extractor.extract(temp_path))
                extraction_status = "COMPLETED"
            except Exception:
                # Keep system metadata even when embedded extraction fails.
                extraction_status = "PARTIAL"
                errors.append("Embedded metadata extraction failed.")

            system_metadata = SystemMetadata(
                file_name=original_name,
                extension=extension,
                mime_type=mime_type,
                size_bytes=size,
                sha256=digest.hexdigest(),
                uploaded_at=datetime.now(timezone.utc),
            )

            response = MetadataResponse(
                file_id=uuid.uuid4(),
                system_metadata=system_metadata,
                embedded_metadata=embedded_metadata,
                extraction_status=extraction_status,
                extraction_errors=errors,
            )
            return self.repository.save(response)
        finally:
            if temp_path is not None:
                temp_path.unlink(missing_ok=True)
            upload.file.close()
