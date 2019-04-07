#!/bin/sh

set -e

echo "Q1. ENV?"
read ENV
echo

echo "Q2. IMAGE_NAME?"
read IMAGE_NAME
echo

echo "Q3. IMAGE_TAG?"
read IMAGE_TAG
echo

echo "Q4. DOCKER_ID_USER?"
read DOCKER_ID_USER
echo

read -p "Releasing $DOCKER_ID_USER/$IMAGE_NAME:$IMAGE_TAG in $ENV mode - are you sure? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $DOCKER_ID_USER/$IMAGE_NAME:$IMAGE_TAG in $ENV mode ..."

  if [[ $ENV == 'stage' ]]; then
    git tag $IMAGE_TAG
    git push origin $IMAGE_TAG
  fi

  docker build -f ./tools/$ENV.Dockerfile -t $IMAGE_NAME:$IMAGE_TAG .

  docker tag $IMAGE_NAME:$IMAGE_TAG $DOCKER_ID_USER/$IMAGE_NAME:$IMAGE_TAG
  docker push $DOCKER_ID_USER/$IMAGE_NAME:$IMAGE_TAG
fi
