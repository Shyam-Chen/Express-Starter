#!/bin/sh

set -e

echo "Q1. ENV?"
read ENV

echo "Q2. IMAGE_NAME?"
read IMAGE_NAME

echo "Q3. IMAGE_TAG?"
read IMAGE_TAG

echo "Q4. DOCKER_ID_USER?"
read DOCKER_ID_USER

docker build -f ./tools/$ENV.Dockerfile -t $IMAGE_NAME:$IMAGE_TAG .

docker tag $IMAGE_NAME:$IMAGE_TAG $DOCKER_ID_USER/$IMAGE_NAME:$IMAGE_TAG
docker push $DOCKER_ID_USER/$IMAGE_NAME:$IMAGE_TAG
