import os


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://postgres:postgres@localhost:5432/file_metadata",
)
MAX_FILE_SIZE_BYTES = int(os.getenv("MAX_FILE_SIZE_BYTES", str(50 * 1024 * 1024)))
EXIFTOOL_TIMEOUT_SECONDS = int(os.getenv("EXIFTOOL_TIMEOUT_SECONDS", "30"))
TEMP_DIR = os.getenv("TEMP_DIR", "/tmp/file-metadata")
