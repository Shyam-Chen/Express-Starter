#!/bin/bash

set -eux

if [[ "$MODE" == "docker" ]]; then
  docker-compose exec app dpl --provider=heroku --app=web-go-demo --api-key=${HEROKU_TOKEN} --strategy=git
fi
