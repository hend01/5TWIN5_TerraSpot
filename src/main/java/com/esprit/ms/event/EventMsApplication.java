package com.esprit.ms.event;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class EventMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventMsApplication.class, args);
	}

}
