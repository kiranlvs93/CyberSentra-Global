#!/bin/sh
set -e

HOSTPORT=$1
shift

HOST=$(printf "%s" "$HOSTPORT" | cut -d: -f1)
PORT=$(printf "%s" "$HOSTPORT" | cut -d: -f2)

until nc -z "$HOST" "$PORT"; do
  echo "Waiting for $HOST:$PORT..."
  sleep 2
done

echo "$HOST:$PORT is available"
exec "$@"
