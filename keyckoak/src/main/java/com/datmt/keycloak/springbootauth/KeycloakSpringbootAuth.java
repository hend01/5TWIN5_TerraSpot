package com.datmt.keycloak.springbootauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class KeycloakSpringbootAuth {

	public static void main(String[] args) {
		SpringApplication.run(KeycloakSpringbootAuth.class, args);
	}

}
