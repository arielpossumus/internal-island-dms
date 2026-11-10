from datetime import datetime, timezone
from uuid import uuid4

from app.domain.models import MetadataResponse, SystemMetadata


def test_metadata_response_model():
    response = MetadataResponse(
        file_id=uuid4(),
        system_metadata=SystemMetadata(
            file_name="sample.pdf",
            extension=".pdf",
            mime_type="application/pdf",
            size_bytes=123,
            sha256="a" * 64,
            uploaded_at=datetime.now(timezone.utc),
        ),
        embedded_metadata={"PDF": {"Title": "Sample"}},
        extraction_status="COMPLETED",
    )

    assert response.system_metadata.file_name == "sample.pdf"
    assert response.embedded_metadata["PDF"]["Title"] == "Sample"
