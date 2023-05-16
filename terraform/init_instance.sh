#!/bin/bash

# install and update apt-get
sudo apt-get update -y


# install and update docker-compose
sudo apt-get install -y docker-compose

# copy the docker-compose.yml file to the instance
cp ./server.yaml "$(pwd)"
cp ./.env "$(pwd)"


# run docker-compose
sudo docker-compose -f server.yaml up -d