package com.example.demo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/todos/**") // Specify the mapping for all to-do routes
//                .allowedOrigins("*") // Allow frontend to make requests
//                .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed HTTP methods
//                .allowedHeaders("*"); // Allow all headers
//    }
//}


@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/todos/**") // Specify the mapping for all to-do routes
                .allowedOrigins("http://localhost:5500") // Explicitly allow this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials if needed
    }
}
