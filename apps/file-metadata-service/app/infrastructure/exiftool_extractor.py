import json
import subprocess
from pathlib import Path
from typing import Any

from app.config import EXIFTOOL_TIMEOUT_SECONDS
from app.domain.extractor import MetadataExtractor


class ExifToolExtractor(MetadataExtractor):
    """General-purpose embedded metadata extractor backed by ExifTool."""

    def extract(self, file_path: Path) -> dict[str, Any]:
        result = subprocess.run(
            [
                "exiftool",
                "-json",
                "-G1",
                "-s",
                "-charset",
                "filename=UTF8",
                str(file_path),
            ],
            capture_output=True,
            text=True,
            timeout=EXIFTOOL_TIMEOUT_SECONDS,
            check=True,
        )
        documents = json.loads(result.stdout or "[]")
        if not documents:
            return {}
        return {
            key: value
            for key, value in documents[0].items()
            if key != "SourceFile" and not key.startswith("System:")
        }
