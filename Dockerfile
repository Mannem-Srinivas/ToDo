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





#
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
#
## Use the official OpenJDK image
#FROM openjdk:17-jdk-slim
#
## Set the working directory in the container
#WORKDIR /app
#
## Copy the JAR file into the container
#COPY target/todo-app-0.0.1-SNAPSHOT.jar app.jar
#
## Expose port 8080 for the backend
#EXPOSE 8080
#
## Run the application
#CMD ["java", "-jar", "app.jar"]
#





# Use Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS builder

# Set working directory for the build
WORKDIR /app

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JDK image for running the app
FROM openjdk:17-jdk-slim

# Set working directory for the app
WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/todo-app-0.0.1-SNAPSHOT.jar app.jar

# Expose the application's port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]


