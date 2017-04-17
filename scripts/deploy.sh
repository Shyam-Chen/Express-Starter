#!/bin/bash

set -eux

if [[ "$MODE" == "docker" ]]; then
  docker login --email=shyamchen1994@gmail.com --username=Shyam-Chen --password=${HEROKU_TOKEN} registry.heroku.com
  docker push registry.github.com/Shyam-Chen/Backend-Starter-Kit:latest
fi
