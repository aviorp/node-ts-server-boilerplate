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
    container_name: ContainerName
    image: aviorp/ImageName
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
JWT_SECRET=5f32c418-7a9f-4dcd-986a-60d46083e9b5
NODE_ENV=DEV
PORT=3300
AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE='1'
AWS_SECRET_ACCESS_KEY=PiHrnlhlw5plHzFpCvZsgAxfi+hc8wEfhIE9re0l
AWS_ACCESS_KEY_ID=AKIAS3YKJTLW76LEG57W
AWS_BUCKET_REGION=us-east-1
CLERK_SECRET_KEY=sk_live_gqR88sjJqFfAMOXK16JTP0isqD7Inr8Je7dTz8Gic4
CAPTCHA_API_KEY=9cb8b89b5e8d1c49e23e537a280954cf
DISCORD_BOT_TOKEN=MTEyMTE2MTQ5MDkzOTAwMjk1NQ.GKz7TN.VXBdywYisT_6SXS_Pl10lgAOmluhjqBL3SpsXc
DISCORD_ADMIN_USER_ID=464072357674352650
EOF
