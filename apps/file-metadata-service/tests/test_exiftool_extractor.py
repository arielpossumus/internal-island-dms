import json
import subprocess
from pathlib import Path

from app.infrastructure import exiftool_extractor
from app.infrastructure.exiftool_extractor import ExifToolExtractor


def test_extract_removes_temp_file_details(monkeypatch):
    output = {
        "SourceFile": "/tmp/file-metadata/upload_x.txt",
        "System:Directory": "/tmp/file-metadata",
        "System:FileName": "upload_x.txt",
        "File:FileType": "TXT",
        "ExifTool:ExifToolVersion": 13.25,
    }
    monkeypatch.setattr(
        exiftool_extractor.subprocess,
        "run",
        lambda *_a, **_k: subprocess.CompletedProcess([], 0, json.dumps([output])),
    )

    result = ExifToolExtractor().extract(Path("/tmp/file-metadata/upload_x.txt"))

    assert result == {"File:FileType": "TXT", "ExifTool:ExifToolVersion": 13.25}
