#!/bin/zsh
SCRIPT_DIR="${0:A:h}"
node "$SCRIPT_DIR/node_modules/next/dist/bin/next" dev --port 3100 "$SCRIPT_DIR"
