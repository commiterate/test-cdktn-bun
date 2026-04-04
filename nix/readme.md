# Nix

Nix flake outputs.

## Layout

Notable landmarks:

```text
Key:
🤖 = Generated

.
│   # Nixpkgs overlays.
├── overlays
│   └── {overlay}
│       └── test-cdktn-bun
│           │   # Packages.
│           ├── packages
│           │   └── {package}
│           │       ├── package.nix
│           │       └── {package support file (e.g. patch)}
│           │
│           │   # Development shells.
│           └── devShells
│               └── {shell}.nix
│
│   # Build recipes.
└── justfile
```

Structure mirrors the Nix flake outputs.
