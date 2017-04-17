#!/bin/bash

set -eux

if [[ "$MODE" == "docker" ]]; then
  docker-compose up -d
fi
