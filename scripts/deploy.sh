#!/bin/bash

set -eux

if [[ "$MODE" == "docker" ]]; then
  # docker login --username=Shyam-Chen --password=${HEROKU_TOKEN} registry.heroku.com
  # export HEROKU_API_KEY=${HEROKU_TOKEN}
  gem install dpl
  dpl --provider=heroku --app=backend-go-demo --api-key=${HEROKU_TOKEN} --strategy=git
fi

# echo "deb http://toolbelt.heroku.com/ubuntu ./" > /etc/apt/sources.list.d/heroku.list
# wget -O- https://toolbelt.heroku.com/apt/release.key | apt-key add -
# apt-get update
# apt-get install -y heroku-toolbelt
# export HEROKU_API_KEY=${HEROKU_TOKEN}
# heroku login
# heroku git:remote -a backend-go-demo
# git push heroku master
