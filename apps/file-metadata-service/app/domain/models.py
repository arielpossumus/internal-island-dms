from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, Field


class SystemMetadata(BaseModel):
    file_name: str
    extension: str | None
    mime_type: str
    size_bytes: int
    sha256: str
    uploaded_at: datetime


class FileSummary(BaseModel):
    file_id: UUID
    file_name: str
    extension: str | None
    mime_type: str
    size_bytes: int
    sha256: str
    extraction_status: str
    uploaded_at: datetime


class MetadataResponse(BaseModel):
    file_id: UUID
    system_metadata: SystemMetadata
    embedded_metadata: dict[str, Any] = Field(default_factory=dict)
    extraction_status: str
    extraction_errors: list[str] = Field(default_factory=list)
