# Use Nginx to serve static files
FROM nginx:alpine

# Copy frontend files to the Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80


## Frontend Dockerfile
#FROM node:18-slim
#
## Set the working directory
#WORKDIR /app
#
## Copy all frontend files
#COPY . .
#
## Expose the port the frontend will run on
#EXPOSE 3000
#
## Serve the frontend using a lightweight HTTP server
#RUN npm install -g serve
#
## Start the server
#CMD ["serve", "-s", ".", "-l", "3000"]
