# Use a smaller Node.js image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for backend dependency installation
COPY package*.json ./ 

# Install backend dependencies
RUN npm install

# Set environment variables
ENV NPM_CONFIG_TIMEOUT=600000
ENV NODE_OPTIONS=--max-old-space-size=4096

# Update npm to the latest version
RUN npm install -g npm@latest --cache /tmp/empty-cache --prefer-offline

# Copy the entire project directory to the container
COPY . .

# Create a volume for uploads
VOLUME ["/usr/src/app/uploads"]

# Expose port 8080 for the backend (express server)
EXPOSE 8080

# Start your backend Express server
CMD ["node", "backend/index.js"]
