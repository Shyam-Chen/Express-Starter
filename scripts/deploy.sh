#!/bin/bash

set -eux

docker login -u="Shyam Chen" -p="${HEROKU_TOKEN}" registry.heroku.com
docker build -f Dockerfile.prod -t registry.heroku.com/web-go-demo/web .
docker push registry.heroku.com/web-go-demo/web
