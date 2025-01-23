## Use OpenJDK as the base image
#FROM openjdk:17-jdk-slim
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy the JAR file into the container
#COPY target/demo-0.0.1-SNAPSHOT.jar app.jar
#
## Expose port 8080 for the backend
#EXPOSE 8080
#
## Run the JAR file
#ENTRYPOINT ["java", "-jar", "app.jar"]




#
## Backend Dockerfile
#FROM openjdk:17-jdk-slim
#
## Set the working directory
#WORKDIR /app
#
## Copy the JAR file from the build stage
#COPY target/todo-backend.jar todo-backend.jar
#
## Expose the port the backend will run on
#EXPOSE 5000
#
## Run the JAR file
#ENTRYPOINT ["java", "-jar", "todo-backend.jar"]





#
## Use OpenJDK as the base image
#FROM openjdk:17-jdk-slim
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy the JAR file into the container
#COPY target/todo-backend.jar app.jar
#
## Expose port 8080 for the backend
#EXPOSE 8080
#
## Run the JAR file
#ENTRYPOINT ["java", "-jar", "app.jar"]






# Use OpenJDK as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 for the backend
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]


