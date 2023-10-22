package terraspot.esprit.tn.terraspot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class TerraspotApplication {

    public static void main(String[] args) {
        SpringApplication.run(TerraspotApplication.class, args);
    }

}
