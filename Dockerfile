FROM node:latest

COPY . .

RUN npm install 
RUN npm run build


COPY node dist/app.js