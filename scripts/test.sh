#!/bin/bash

set -eux

docker-compose exec app yarn lint
docker-compose exec app yarn unit
