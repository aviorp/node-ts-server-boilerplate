FROM  --platform=linux/amd64  node:18.12.1-alpine

WORKDIR /app

COPY package.json .

RUN apk --no-cache add --virtual builds-deps build-base python
# install dependecies
RUN yarn
COPY . .
# compile TS to JS 
RUN yarn build

EXPOSE 3300
# run as native js
CMD yarn start
