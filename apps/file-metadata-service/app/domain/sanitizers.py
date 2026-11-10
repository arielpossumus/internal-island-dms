from pathlib import Path
from typing import Any

MAX_FILE_NAME_LENGTH = 255
MAX_EXTENSION_LENGTH = 30


def strip_nul(value: Any) -> Any:
    """Recursively remove NUL characters, which PostgreSQL text/JSONB reject."""
    if isinstance(value, str):
        return value.replace("\x00", "").replace("\\u0000", "")
    if isinstance(value, dict):
        return {strip_nul(k): strip_nul(v) for k, v in value.items()}
    if isinstance(value, list):
        return [strip_nul(v) for v in value]
    return value


def sanitize_file_name(raw_name: str) -> tuple[str, str | None]:
    """Return a (file_name, extension) pair that fits the storage columns."""
    name = Path(strip_nul(raw_name)).name or "unnamed"
    extension = Path(name).suffix.lower() or None
    if extension and len(extension) > MAX_EXTENSION_LENGTH:
        extension = None
    if len(name) > MAX_FILE_NAME_LENGTH:
        suffix = Path(name).suffix
        keep = MAX_FILE_NAME_LENGTH - len(suffix)
        if keep < 1:
            name, suffix = name[:MAX_FILE_NAME_LENGTH], ""
        else:
            name = name[:keep] + suffix
    return name, extension
