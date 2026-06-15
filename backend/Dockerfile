# ==========================================
# 1. BUILD STAGE
# ==========================================
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy the pom.xml file first to cache dependency downloads
COPY pom.xml .

# Download project dependencies (offline mode helps cache them)
RUN mvn dependency:go-offline -B

# Copy the source code and build the application JAR
COPY src ./src
RUN mvn clean package -DskipTests

# ==========================================
# 2. RUN TIME STAGE
# ==========================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/portfolio-1.0.0.jar app.jar

# Expose the port Spring Boot is running on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
