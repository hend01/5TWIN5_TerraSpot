package com.esprit.gestion_reclamation.Conf;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5001");
        config.addAllowedOrigin("https://api.cloudinary.com/v1_1/dotvzhxdz/image/upload");
        config.addAllowedOrigin("https://api.cloudinary.com");
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        // Handle preflight requests (OPTIONS)
        config.addAllowedMethod(HttpMethod.OPTIONS);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}