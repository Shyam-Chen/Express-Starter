#!/bin/bash

set -eux

case $MODE in
  "docker" )
    docker-compose exec app yarn run lint
    docker-compose exec app yarn run unit
    ;;
  "lint" )
    yarn run lint
    ;;
  "unit" )
    yarn run unit
    ;;
esac
