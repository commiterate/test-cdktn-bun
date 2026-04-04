# Infrastructure

Infrastructure.

Managed with [OpenTofu](https://opentofu.org) and [CDK Terrain](https://cdktn.io) (CDKTN).

## Layout

Notable landmarks:

```text
Key:
🤖 = Generated

.
│   # CDKTN build artifacts.
├── build 🤖
│   └── ...
│
│   # npm package source.
├── src
│   └── ...
│
│   # Build recipes.
├── justfile
│
│   # Bun configuration.
├── package.json
│
│   # CDKTN configuration.
└── cdktf.json
```
