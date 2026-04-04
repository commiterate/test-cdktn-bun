{
  awscli2,
  bun,
  coreutils,
  git,
  git-lfs,
  just,
  lib,
  mkShell,
  nix,
  nixfmt,
  opentofu,
  oxfmt,
  oxlint,
  treefmt,
}:
mkShell {
  packages = [
    # Nix.
    #
    # Nix is dynamically linked on some systems. If we set LD_LIBRARY_PATH,
    # running Nix commands with the system-installed Nix may fail due to mismatched library versions.
    nix
    nixfmt
    # Utilities.
    coreutils
    # Git.
    git
    git-lfs
    # Just.
    just
    # Treefmt.
    treefmt
    # JavaScript.
    bun
    oxfmt
    oxlint
    # AWS CLI.
    awscli2
  ];

  shellHook = ''
    # CDK Terrain (CDKTN).
    #
    # https://cdktn.io/docs/create-and-deploy/environment-variables
    export TERRAFORM_BINARY_NAME=${lib.meta.getExe opentofu}

    echo "❄️"
  '';
}
