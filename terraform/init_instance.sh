#!/bin/bash


# install and update apt-get
sudo apt-get update -y

# install and update docker
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo chmod -G docker ubuntu
sudo usermod -a -G docker ubuntu
# install and update docker-compose
sudo apt-get install -y docker-compose




cat <<EOF > app.yml
version: "3.4" # optional since v1.27.0
services:
  server:
    container_name: server
    image: shuttlelink/server
    env_file: .env
    ports:
      - 80:3300
  watchtower:
    container_name: watchtower
    restart: always
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --cleanup --interval 30
EOF

cat <<EOF > .env
JWT_SECRET=secret
DB_URI="mongodb+srv://admin:TagO16AAivmbS7Wx@cluster0.mgw5eqj.mongodb.net/TEST_DB"
NODE_ENV=DEV
PORT=3300
AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE=1
EOF
