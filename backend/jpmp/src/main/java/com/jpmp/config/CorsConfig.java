package com.jpmp.config;


import com.jpmp.common.util.JwtTokenUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);   // 내 서버가 응답할 때, JSON을 자바스크립트에서 처리할 수 있게 할지 설정
        config.addAllowedOriginPattern("*");   // 모든 ip에 응답 허용
        config.addAllowedHeader("*");   // 모든 header에 응답 허용
        config.addExposedHeader("Authorization");
        config.addAllowedMethod("*");   // 모든 post, get, put, delete, patch 요청을 허용
        config.setMaxAge(3600L);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
