# File Metadata Service

Initial runnable baseline for a synchronous Python service that receives a file,
extracts system and embedded metadata, stores metadata only, and discards the
temporary file.

## Decisions

- Synchronous processing.
- Metadata-only persistence (the original file is not retained).
- Broad format coverage through ExifTool.
- FastAPI REST API.
- PostgreSQL JSONB for variable embedded metadata.

## Requirements

- Docker Engine and Docker Compose plugin.
- Alternatively, Python 3.12, PostgreSQL, ExifTool, and libmagic.

## Run with Docker Compose

```bash
docker compose up --build
```

API documentation: <http://localhost:8000/swagger/index.html>  
Health check: <http://localhost:8000/health>

## Upload a file

```bash
curl -X POST "http://localhost:8000/api/v1/files/metadata" \
  -F "file=@./sample.jpg"
```

The response contains:
- `system_metadata`: filename, extension, MIME type, byte size, SHA-256 and upload timestamp.
- `embedded_metadata`: fields returned by ExifTool, grouped by metadata family.
- `extraction_status`: `COMPLETED` or `PARTIAL`.
- `extraction_errors`: non-sensitive extraction error descriptions.

## Retrieve metadata

Use the `file_id` returned by the upload:

```bash
curl "http://localhost:8000/api/v1/files/<file_id>/metadata"
```

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/v1/files/metadata` | Upload a file and extract metadata |
| GET | `/api/v1/files` | List files (`limit`, `offset`, `mime_type`) |
| GET | `/api/v1/files/{id}` | File summary |
| GET | `/api/v1/files/{id}/metadata` | Full system and embedded metadata |
| GET | `/api/v1/files/hash/{sha256}` | Find files by SHA-256 |

## Run tests locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pytest
```

## Important limitations of this baseline

1. `MAX_FILE_SIZE_BYTES` is checked while copying the upload to a temporary file.
   Reverse-proxy/server request limits should also be configured for production.
2. ExifTool offers broad format coverage, not a guarantee that every file format
   or every embedded field is supported.
3. Some file formats may contain no embedded metadata. They can still produce
   system metadata and an empty embedded metadata object.
4. The current database schema is created at startup for convenience.
   Introduce Alembic migrations before production.
5. The example Compose credentials are development-only. Use secrets in real
   environments.
6. Consider sandboxing the extractor further, adding rate limits, antivirus or
   content scanning, retention controls, structured logging, and monitoring.
7. Metadata can contain personal or sensitive information (for example GPS
   coordinates). Protect API access and consider field-level filtering.

## Next iterations

- Add search/filter by embedded metadata fields.
- Add Alembic migrations.
- Add extractor registry and format-specific strategies where useful.
- Add duplicate detection policy using SHA-256.
- Add integration tests with representative sample files.
- Add authentication and authorization.
