#!/bin/sh

set -o nounset
set -o errexit

docker build \
  -f ./tools/produce.Dockerfile \
  --build-arg secret_key=${SECRET_KEY} \
  --build-arg mongodb_uri=${MONGODB_URI} \
  --build-arg postgres_url=${POSTGRES_URL} \
  --build-arg redis_url=${REDIS_URL} \
  --build-arg sentry_dsn=${SENTRY_DSN} \
  --squash \
  -t $APP_NAME .
