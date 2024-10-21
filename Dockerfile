# Use the latest official Node.js image
FROM node:20

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for backend dependency installation
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Set environment variables
ENV NPM_CONFIG_TIMEOUT=600000
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN npm config set registry https://registry.npmjs.org/

# Update npm to the latest version
RUN npm install -g npm@latest --cache /tmp/empty-cache --prefer-offline

# Copy the entire project directory to the container
COPY . .

# Create a volume for uploads
VOLUME ["/usr/src/app/uploads"]

# Copy frontend build files (adjust the path as necessary)
COPY ./frontend/build /usr/share/nginx/html

# Expose port 8080 for the backend (express server)
EXPOSE 8080

# Start your backend Express server
CMD ["node", "backend/index.js"]
