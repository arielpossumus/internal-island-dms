from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any


class MetadataExtractor(ABC):
    """Strategy contract for embedded metadata extraction."""

    @abstractmethod
    def extract(self, file_path: Path) -> dict[str, Any]:
        """Return embedded metadata; raise on unreadable files."""
