#!/usr/bin/env bash

set -e

read -p "Transfer now? (Y/n): " REPLY
if [[ ! $REPLY =~ ^[Yy]$ ]] && [ ! -z "$REPLY" ]; then
    exit 0
fi

echo

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

$SCRIPT_DIR/upload.sh
