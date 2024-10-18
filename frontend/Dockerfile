# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app using a static server
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
