# Start with the official Node.js 18 Alpine image
FROM node:18-alpine3.19

# Set the working directory in the container
WORKDIR /nodeproject
# Install any necessary dependencies
RUN apk add --no-cache bash

# Install PM2 globally
RUN npm install pm2 -g


# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install -i

# Copy the rest of the application code into the container
COPY server.* eslint.config.mjs ./

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app using PM2
CMD ["pm2", "start", "server.js", "--name", "nodeproject", "--no-daemon"]