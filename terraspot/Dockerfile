FROM openjdk:8
EXPOSE 8082
ADD target/terraspot-0.0.1-SNAPSHOT.jar terraspott-docker.jar
ENTRYPOINT ["java","-jar","terraspott-docker.jar"]