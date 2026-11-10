import io
from pathlib import Path
from uuid import uuid4

import pytest
from fastapi import UploadFile

from app.application import metadata_service
from app.application.metadata_service import FileMetadataService
from app.domain.errors import FileTooLargeError
from app.domain.extractor import MetadataExtractor


class FakeRepository:
    def save(self, metadata):
        return metadata


class FakeExtractor(MetadataExtractor):
    def extract(self, file_path: Path):
        assert file_path.exists()
        return {"File": {"FileType": "TXT"}}


class FailingExtractor(MetadataExtractor):
    def extract(self, file_path: Path):
        raise RuntimeError("boom")


@pytest.fixture(autouse=True)
def isolated_env(tmp_path, monkeypatch):
    monkeypatch.setattr(metadata_service, "TEMP_DIR", str(tmp_path))
    monkeypatch.setattr(
        metadata_service.magic, "from_file", lambda *_a, **_k: "text/plain"
    )
    return tmp_path


def make_upload(content: bytes, name: str = "note.TXT") -> UploadFile:
    return UploadFile(file=io.BytesIO(content), filename=name)


def test_process_extracts_system_and_embedded_metadata(isolated_env):
    service = FileMetadataService(FakeRepository(), FakeExtractor())

    result = service.process(make_upload(b"hello"))

    assert result.extraction_status == "COMPLETED"
    assert result.system_metadata.extension == ".txt"
    assert result.system_metadata.size_bytes == 5
    assert result.system_metadata.sha256 == (
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    )
    assert result.embedded_metadata == {"File": {"FileType": "TXT"}}
    assert list(isolated_env.iterdir()) == []


def test_process_returns_partial_when_extractor_fails(isolated_env):
    service = FileMetadataService(FakeRepository(), FailingExtractor())

    result = service.process(make_upload(b"hello"))

    assert result.extraction_status == "PARTIAL"
    assert result.embedded_metadata == {}
    assert result.extraction_errors
    assert list(isolated_env.iterdir()) == []


def test_process_rejects_oversized_file_and_removes_temp(isolated_env, monkeypatch):
    monkeypatch.setattr(metadata_service, "MAX_FILE_SIZE_BYTES", 3)
    service = FileMetadataService(FakeRepository(), FakeExtractor())

    with pytest.raises(FileTooLargeError):
        service.process(make_upload(b"hello"))

    assert list(isolated_env.iterdir()) == []


def test_process_sanitizes_long_name_and_nul_characters(isolated_env):
    class NulExtractor(MetadataExtractor):
        def extract(self, file_path: Path):
            return {"File:Title": "a\x00b", "Nested": ["x\x00"]}

    service = FileMetadataService(FakeRepository(), NulExtractor())

    result = service.process(make_upload(b"hi", "a" * 300 + ".pdf"))

    assert len(result.system_metadata.file_name) == 255
    assert result.system_metadata.file_name.endswith(".pdf")
    assert result.embedded_metadata == {"File:Title": "ab", "Nested": ["x"]}


def test_process_drops_oversized_extension(isolated_env):
    service = FileMetadataService(FakeRepository(), FakeExtractor())

    result = service.process(make_upload(b"hi", "file." + "x" * 40))

    assert result.system_metadata.extension is None
    assert result.extraction_status == "COMPLETED"
