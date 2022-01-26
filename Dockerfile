FROM node:14.17.1

COPY package.json package.json
RUN yarn
WORKDIR /dist
COPY . /dist/
RUN yarn build
