from uuid import UUID

from sqlalchemy import BigInteger, DateTime, String, select
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.domain.models import FileSummary, MetadataResponse, SystemMetadata
from app.infrastructure.database import Base, SessionLocal


class FileMetadataEntity(Base):
    __tablename__ = "file_metadata"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True)
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    extension: Mapped[str | None] = mapped_column(String(30))
    mime_type: Mapped[str] = mapped_column(String(255), nullable=False)
    size_bytes: Mapped[int] = mapped_column(BigInteger, nullable=False)
    sha256: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    system_metadata: Mapped[dict] = mapped_column(JSONB, nullable=False)
    embedded_metadata: Mapped[dict] = mapped_column(JSONB, nullable=False)
    extraction_status: Mapped[str] = mapped_column(String(20), nullable=False)
    extraction_errors: Mapped[list] = mapped_column(JSONB, nullable=False)
    uploaded_at: Mapped[object] = mapped_column(DateTime(timezone=True), nullable=False)


class MetadataRepository:
    def save(self, metadata: MetadataResponse) -> MetadataResponse:
        entity = FileMetadataEntity(
            id=metadata.file_id,
            file_name=metadata.system_metadata.file_name,
            extension=metadata.system_metadata.extension,
            mime_type=metadata.system_metadata.mime_type,
            size_bytes=metadata.system_metadata.size_bytes,
            sha256=metadata.system_metadata.sha256,
            system_metadata=metadata.system_metadata.model_dump(mode="json"),
            embedded_metadata=metadata.embedded_metadata,
            extraction_status=metadata.extraction_status,
            extraction_errors=metadata.extraction_errors,
            uploaded_at=metadata.system_metadata.uploaded_at,
        )
        with SessionLocal() as session:
            session.add(entity)
            session.commit()
        return metadata

    def get(self, file_id: UUID) -> MetadataResponse | None:
        with SessionLocal() as session:
            entity = session.get(FileMetadataEntity, file_id)
            if entity is None:
                return None

            return MetadataResponse(
                file_id=entity.id,
                system_metadata=SystemMetadata.model_validate(
                    entity.system_metadata
                ),
                embedded_metadata=entity.embedded_metadata,
                extraction_status=entity.extraction_status,
                extraction_errors=entity.extraction_errors,
            )

    def get_summary(self, file_id: UUID) -> FileSummary | None:
        with SessionLocal() as session:
            entity = session.get(FileMetadataEntity, file_id)
            return _to_summary(entity) if entity else None

    def list_files(
        self,
        limit: int = 50,
        offset: int = 0,
        mime_type: str | None = None,
    ) -> list[FileSummary]:
        stmt = select(FileMetadataEntity)
        if mime_type:
            stmt = stmt.where(FileMetadataEntity.mime_type == mime_type)
        stmt = (
            stmt.order_by(FileMetadataEntity.uploaded_at.desc())
            .limit(limit)
            .offset(offset)
        )
        with SessionLocal() as session:
            return [_to_summary(e) for e in session.scalars(stmt)]

    def find_by_sha256(self, sha256: str) -> list[FileSummary]:
        stmt = (
            select(FileMetadataEntity)
            .where(FileMetadataEntity.sha256 == sha256)
            .order_by(FileMetadataEntity.uploaded_at.desc())
        )
        with SessionLocal() as session:
            return [_to_summary(e) for e in session.scalars(stmt)]


def _to_summary(entity: FileMetadataEntity) -> FileSummary:
    return FileSummary(
        file_id=entity.id,
        file_name=entity.file_name,
        extension=entity.extension,
        mime_type=entity.mime_type,
        size_bytes=entity.size_bytes,
        sha256=entity.sha256,
        extraction_status=entity.extraction_status,
        uploaded_at=entity.uploaded_at,
    )
