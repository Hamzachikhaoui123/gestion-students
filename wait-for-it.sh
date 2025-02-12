#!/usr/bin/env bash
set -e

TIMEOUT=60
HOST="$1"
PORT="$2"
shift 2
CMD="$@"

echo "Waiting for MySQL at $HOST:$PORT to be available..."

for ((i=0; i<TIMEOUT; i++)); do
  if nc -z -v "$HOST" "$PORT"; then
    echo "✅ MySQL is up! Starting application..."
    exec $CMD
  fi
  echo "Waiting for MySQL..."
  sleep 2
done

echo "⛔ Timeout reached: MySQL is still not available."
exit 1
