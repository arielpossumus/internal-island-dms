import logging
from typing import Annotated
from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    Path,
    Query,
    UploadFile,
    status,
)

from app.application.metadata_service import FileMetadataService
from app.domain.errors import FileTooLargeError
from app.domain.models import FileSummary, MetadataResponse
from app.infrastructure.metadata_repository import MetadataRepository

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/files", tags=["Files"])

SHA256_PATTERN = r"^[a-fA-F0-9]{64}$"


def get_repository() -> MetadataRepository:
    return MetadataRepository()


def get_service(
    repository: Annotated[MetadataRepository, Depends(get_repository)],
) -> FileMetadataService:
    return FileMetadataService(repository=repository)


@router.post(
    "/metadata",
    response_model=MetadataResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a file and extract its metadata",
    description=(
        "Receives a file as multipart/form-data, computes system metadata "
        "(file name, extension, MIME type, size and SHA-256) and extracts the "
        "embedded metadata with ExifTool. Only the metadata is stored; the "
        "uploaded file is discarded after processing.\n\n"
        "`extraction_status` is `COMPLETED`, or `PARTIAL` when embedded "
        "extraction failed but system metadata was still saved."
    ),
    responses={
        413: {"description": "The file exceeds the maximum allowed size."},
        500: {"description": "The file could not be processed."},
    },
)
def upload_and_extract(
    service: Annotated[FileMetadataService, Depends(get_service)],
    file: UploadFile = File(...),
):
    try:
        return service.process(file)
    except FileTooLargeError as exc:
        raise HTTPException(status_code=413, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Failed to process uploaded file")
        # Avoid returning internal paths, SQL details, or extractor output.
        raise HTTPException(
            status_code=500,
            detail="The file could not be processed.",
        ) from exc


@router.get(
    "",
    response_model=list[FileSummary],
    summary="List stored files",
    description=(
        "Returns a paginated list of file summaries, newest first. "
        "Use `limit` (1-200) and `offset` for pagination, and optionally "
        "`mime_type` to filter by exact MIME type (e.g. `image/jpeg`)."
    ),
)
def list_files(
    repository: Annotated[MetadataRepository, Depends(get_repository)],
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
    offset: Annotated[int, Query(ge=0)] = 0,
    mime_type: str | None = None,
):
    return repository.list_files(limit=limit, offset=offset, mime_type=mime_type)


@router.get(
    "/hash/{sha256}",
    response_model=list[FileSummary],
    summary="Find files by SHA-256",
    description=(
        "Returns all stored file summaries whose content hash matches the given "
        "64-character hexadecimal SHA-256 (case-insensitive). Useful to detect "
        "duplicate uploads. Returns an empty list when there are no matches."
    ),
)
def find_by_hash(
    sha256: Annotated[str, Path(pattern=SHA256_PATTERN)],
    repository: Annotated[MetadataRepository, Depends(get_repository)],
):
    return repository.find_by_sha256(sha256.lower())


@router.get(
    "/{file_id}",
    response_model=FileSummary,
    summary="Get a file summary",
    description=(
        "Returns the summary of a stored file (name, extension, MIME type, "
        "size, SHA-256, extraction status and upload date) without the full "
        "embedded metadata."
    ),
    responses={404: {"description": "File metadata not found."}},
)
def get_file(
    file_id: UUID,
    repository: Annotated[MetadataRepository, Depends(get_repository)],
):
    result = repository.get_summary(file_id)
    if result is None:
        raise HTTPException(status_code=404, detail="File metadata not found.")
    return result


@router.get(
    "/{file_id}/metadata",
    response_model=MetadataResponse,
    summary="Get full file metadata",
    description=(
        "Returns the complete stored metadata of a file: system metadata, "
        "embedded metadata extracted by ExifTool (grouped by metadata family), "
        "extraction status and any extraction errors."
    ),
    responses={404: {"description": "File metadata not found."}},
)
def get_metadata(
    file_id: UUID,
    repository: Annotated[MetadataRepository, Depends(get_repository)],
):
    result = repository.get(file_id)
    if result is None:
        raise HTTPException(status_code=404, detail="File metadata not found.")
    return result
