#
# just configuration.
#
# https://just.systems/man/en
#

# List recipes.
help:
	just --list

# Build the Nix flake outputs.
nix:
	just nix/build

# Build the infrastructure.
infrastructure:
	just infrastructure/build

# Release build.
build: nix infrastructure
