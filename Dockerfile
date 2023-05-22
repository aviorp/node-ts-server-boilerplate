FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Compile Prisma Modules and Generate updated Prisma file
RUN npm run db

# Compile typescript
RUN npm run build

# Expose port 3300
EXPOSE 3300

# Start the app
CMD [ "npm", "start" ]