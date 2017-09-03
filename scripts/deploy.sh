#!/bin/bash

set -eux

# docker-compose exec app dpl --provider=heroku --app=web-go-demo --api-key=${HEROKU_TOKEN} --strategy=git

docker login -u="Shyam Chen" -p="${HEROKU_TOKEN}" registry.heroku.com

docker build -f Dockerfile.prod -t registry.heroku.com/web-go-demo/web .
docker push registry.heroku.com/web-go-demo/web
