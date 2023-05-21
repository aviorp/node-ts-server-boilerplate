#!/bin/bash

# Get the origin URL of the repository
REPO_URL=$(git remote get-url origin)
# Extract the repository name from the origin URL
REPO_NAME=$(echo "$ORIGIN_URL" | sed -e 's/.*\/\([^ ]*\/[^ ]*\)\(\.git\)*$/\1/')

echo "Repository name: $REPO_NAME"

# install and update apt-get
sudo apt-get update -y

# install and update docker
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

# install and update docker-compose
sudo apt-get install -y docker-compose

sudo git clone "$REPO_URL"

sudo sh -c cd "$REPO_NAME" || exit

sudo cp ./.env home/ubuntu/.env
sudo cp ./app.yaml home/ubuntu/app.yaml
sudo sh -c cd .. || exit

sudo rm -rf "$REPO_NAME"

sudo docker-compose -f app.yaml up
