from datetime import datetime, timezone
from uuid import uuid4

import pytest
from fastapi.testclient import TestClient

from app.api import files
from app.domain.models import FileSummary, MetadataResponse, SystemMetadata
from app.main import app

SHA = "a" * 64


def make_summary(file_id=None) -> FileSummary:
    return FileSummary(
        file_id=file_id or uuid4(),
        file_name="a.pdf",
        extension=".pdf",
        mime_type="application/pdf",
        size_bytes=1,
        sha256=SHA,
        extraction_status="COMPLETED",
        uploaded_at=datetime.now(timezone.utc),
    )


class FakeRepository:
    def __init__(self):
        self.summary = make_summary()

    def get_summary(self, file_id):
        return self.summary if file_id == self.summary.file_id else None

    def get(self, file_id):
        if file_id != self.summary.file_id:
            return None
        return MetadataResponse(
            file_id=file_id,
            system_metadata=SystemMetadata(
                file_name="a.pdf",
                extension=".pdf",
                mime_type="application/pdf",
                size_bytes=1,
                sha256=SHA,
                uploaded_at=self.summary.uploaded_at,
            ),
            extraction_status="COMPLETED",
        )

    def list_files(self, limit, offset, mime_type):
        return [self.summary]

    def find_by_sha256(self, sha256):
        return [self.summary] if sha256 == SHA else []


@pytest.fixture
def repo():
    return FakeRepository()


@pytest.fixture
def client(repo):
    app.dependency_overrides[files.get_repository] = lambda: repo
    yield TestClient(app)
    app.dependency_overrides.clear()


def test_health(client):
    assert client.get("/health").json() == {"status": "ok"}


def test_get_file(client, repo):
    response = client.get(f"/api/v1/files/{repo.summary.file_id}")
    assert response.status_code == 200
    assert response.json()["sha256"] == SHA


def test_get_file_not_found(client):
    assert client.get(f"/api/v1/files/{uuid4()}").status_code == 404


def test_get_metadata(client, repo):
    response = client.get(f"/api/v1/files/{repo.summary.file_id}/metadata")
    assert response.status_code == 200
    assert response.json()["system_metadata"]["mime_type"] == "application/pdf"


def test_list_files(client):
    response = client.get("/api/v1/files", params={"limit": 10})
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_list_files_rejects_invalid_limit(client):
    assert client.get("/api/v1/files", params={"limit": 0}).status_code == 422


def test_find_by_hash(client):
    assert len(client.get(f"/api/v1/files/hash/{SHA}").json()) == 1
    assert client.get(f"/api/v1/files/hash/{'b' * 64}").json() == []


def test_find_by_hash_rejects_invalid_hash(client):
    assert client.get("/api/v1/files/hash/not-a-hash").status_code == 422
