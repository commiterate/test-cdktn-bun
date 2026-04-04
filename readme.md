# test-cdktn-bun

Testing [Bun support in CDKTN](https://github.com/open-constructs/cdk-terrain/issues/4).

Use this repository in the `nixos/nix` container to create a minimal environment described by the Nix shell (e.g. no Node.js).

```shell
# Clone the repository.
git clone git@github.com:commiterate/test-cdktn-bun.git
cd test-cdktn-bun

# Run a minimal Nix shell in a container.
docker container run --env NIX_CONFIG="experimental-features = nix-command flakes" --interactive --volume $(pwd):/workplace/test-cdktn-bun --rm --tty --workdir /workplace/test-cdktn-bun nixos/nix:latest nix develop

# Substitute one of the placeholder AWS account IDs in `infrastructure/src/utils/domain.ts`.

# Build the infrastructure.
cd infrastructure
just build

# Run CDKTN commands.
bun run cdktn diff
```

## Layout

```text
Key:
🤖 = Generated

.
│   # Nix flake outputs.
├── nix
│   └── ...
│
│   # Infrastructure.
├── infrastructure
│   └── ...
│
│   # Nix configuration.
├── flake.nix
├── flake.lock 🤖
│
│   # Bun workspace configuration.
├── package.json
├── bun.lock 🤖
│
│   # Build recipes.
└── justfile
```

## Tools

### Nix

[Nix](https://nixos.org) is a package manager and build system centered around reproducibility.

For us, Nix's most useful feature is its ability to create reproducible + isolated CLI shells on the same machine which use different versions of the same package (e.g. Java 17 and 21). Shell configurations can be encapsulated in Nix files which can be shared across multiple computers.

The best way to install Nix is with the [Determinate Nix Installer](https://github.com/DeterminateSystems/nix-installer) ([guide](https://zero-to-nix.com/start/install)).

Once installed, running `nix develop` in a directory with a `flake.nix` will create a nested Bash shell defined by the flake.

> 🔖
>
> If you're on a network with lots of GitHub traffic, you may get a rate limiting error. To work around this, you can either switch networks (e.g. turn off VPN) or add a GitHub personal access token (classic) to your [Nix configuration](https://nix.dev/manual/nix/latest/command-ref/conf-file).
>
> ```text
> access-tokens = github.com=ghp_{rest of token}
> ```

### direnv

[direnv](https://direnv.net) is a shell extension which can automatically load and unload environment variables when you enter or leave a specific directory.

It can automatically load and unload a Nix environment when we enter and leave a project directory.

**Unlike `nix develop` which drops you in a nested Bash shell, direnv extracts the environment variables from the nested Bash shell into your current shell (e.g. Bash, Zsh, Fish).**

Follow the [installation instructions on its website](https://direnv.net#basic-installation).

It also has [editor integration](https://github.com/direnv/direnv/wiki#editor-integration). Note that some integrations won't automatically reload the environment after Nix flake changes unlike direnv itself so manual reloads may be needed.
