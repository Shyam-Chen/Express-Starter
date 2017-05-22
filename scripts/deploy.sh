#!/bin/bash

set -eux

# docker-compose exec app yarn run build
# docker-compose exec app git add -f dist
docker-compose exec app dpl --provider=heroku --app=web-go-demo --api-key=${HEROKU_TOKEN} --strategy=git
