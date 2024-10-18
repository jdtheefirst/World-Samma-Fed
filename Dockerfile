# Use an official Node.js runtime as a parent image
FROM node:16

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Create a volume for uploads
VOLUME ["/app/uploads"]

# Install frontend dependencies and build the frontend
WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build

# Expose port 8080 for the backend (express server)
EXPOSE 8080

# Start your backend Express server
CMD ["node", "backend/index.js"]
