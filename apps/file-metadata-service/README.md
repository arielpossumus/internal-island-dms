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

## Run with Docker Compose (recommended)

Run all commands from `apps/file-metadata-service`.

```bash
# Build and start the API and PostgreSQL (foreground)
docker compose up --build

# Or in the background
docker compose up --build -d
```

| Service | Container | URL / Port |
| --- | --- | --- |
| API | `file-metadata-api` | <http://localhost:8000> |
| PostgreSQL | `file-metadata-db` | `localhost:5433` (user/password `postgres`, db `file_metadata`) |

- API documentation: <http://localhost:8000/swagger/index.html>
- Health check: <http://localhost:8000/health> (returns `{"status": "ok"}`)

The API waits for the database healthcheck, and the schema is created
automatically at startup.

Useful commands:

```bash
docker compose ps                  # status of the containers
docker compose logs -f api         # follow API logs
docker compose down                # stop and remove containers (keeps data)
docker compose down -v             # also delete the database volume
```

### Configuration

Environment variables (defaults in `app/config.py`, overridden in `docker-compose.yml`):

| Variable | Default | Description |
| --- | --- | --- |
| `DATABASE_URL` | local PostgreSQL on `localhost:5432` | SQLAlchemy URL (`postgresql+psycopg://...`) |
| `MAX_FILE_SIZE_BYTES` | `52428800` (50 MB) | Maximum accepted upload size |
| `EXIFTOOL_TIMEOUT_SECONDS` | `30` | Timeout for each ExifTool run |
| `TEMP_DIR` | `/tmp/file-metadata` | Temporary folder for uploads (deleted after processing) |

## Run locally without Docker

Requires Python 3.12, a running PostgreSQL, [ExifTool](https://exiftool.org/)
available in `PATH`, and libmagic (on Windows it is installed by
`python-magic-bin`; on Debian/Ubuntu: `apt install libmagic1 libimage-exiftool-perl`).

1. Start only the database (published on port 5433):

   ```bash
   docker compose up -d db
   ```

2. Create the virtual environment and install dependencies:

   ```bash
   python -m venv .venv
   # Linux/macOS
   source .venv/bin/activate
   # Windows PowerShell
   .venv\Scripts\Activate.ps1

   pip install -r requirements.txt
   ```

3. Set the environment variables and start the server:

   ```bash
   # Linux/macOS
   export DATABASE_URL="postgresql+psycopg://postgres:postgres@localhost:5433/file_metadata"
   export TEMP_DIR="/tmp/file-metadata"
   uvicorn app.main:app --reload --port 8000
   ```

   ```powershell
   # Windows PowerShell
   $env:DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5433/file_metadata"
   $env:TEMP_DIR = "$env:TEMP\file-metadata"
   uvicorn app.main:app --reload --port 8000
   ```

4. Open <http://localhost:8000/swagger/index.html>.

## Troubleshooting

- **Port 8000 or 5433 already in use:** stop the other process or change the
  published ports in `docker-compose.yml`.
- **`exiftool` not found when running locally:** install ExifTool and make sure
  it is in `PATH`; uploads will otherwise finish with `PARTIAL` status.
- **Database connection errors locally:** check that the `db` container is
  healthy (`docker compose ps`) and that `DATABASE_URL` uses port `5433`.

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
