#!/usr/bin/env sh
set -eu

INSTALL_DIR="${HOME}/.runlore/bin"
CLI_URL="${RUNLORE_CLI_URL:-https://runlore.dev/runlore.js}"
TARGET="${INSTALL_DIR}/runlore"

mkdir -p "$INSTALL_DIR"

if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$CLI_URL" -o "$TARGET"
elif command -v wget >/dev/null 2>&1; then
  wget -qO "$TARGET" "$CLI_URL"
else
  echo "runlore install failed: curl or wget is required" >&2
  exit 1
fi

chmod +x "$TARGET"

case ":$PATH:" in
  *":$INSTALL_DIR:"*) ;;
  *)
    echo ""
    echo "Add Runlore to your PATH:"
    echo "  export PATH=\"\$HOME/.runlore/bin:\$PATH\""
    ;;
esac

echo "Runlore installed at $TARGET"
echo "Next: runlore setup"
