#!/bin/bash

set -eux

docker-compose exec app yarn run lint
docker-compose exec app yarn run unit
