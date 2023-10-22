package com.esprit.gestion_reclamation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class GestionReclamationApplication {

    public static void main(String[] args) {

        SpringApplication.run(GestionReclamationApplication.class, args);
    }

}
