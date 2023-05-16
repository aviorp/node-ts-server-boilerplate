FROM node:latest


# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Compile typescript
RUN npm run build

# Expose port 3300
EXPOSE 3300
CMD [ "npm", "start" ]