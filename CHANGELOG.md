# Changelog

All notable user-visible changes should be documented in this file.

This project uses a structure inspired by Keep a Changelog.

Template usage:

- Keep entries under `## [Unreleased]` while changes are not released.
- Move grouped entries into a versioned section when releasing.
- Use concise, user-focused statements.

## [Unreleased]

### Added

- Root `tech_stack.md`: Backend, Database, and Backend Conventions sections now reflect the real stack of `file-metadata-service`.
- `file-metadata-service`: README now documents running with Docker Compose and locally, configuration variables, and troubleshooting.

### Changed

- `file-metadata-service`: embedded metadata no longer exposes `SourceFile` or `System:*` fields (internal temporary file paths).

### Fixed

- `file-metadata-service`: only oversized uploads return 413; other internal errors return 500 and are logged.
- `file-metadata-service`: long file names/extensions and NUL characters in metadata no longer cause storage failures.

### Removed

- [Describe removed features or support]

### Deprecated

- [Describe features scheduled for removal]

### Security

- [Describe security hardening or vulnerability fixes]

## [x.y.z] - YYYY-MM-DD

### Added

- [Release additions]

### Changed

- [Release changes]

### Fixed

- [Release fixes]

### Removed

- [Release removals]

### Deprecated

- [Release deprecations]

### Security

- [Release security updates]
