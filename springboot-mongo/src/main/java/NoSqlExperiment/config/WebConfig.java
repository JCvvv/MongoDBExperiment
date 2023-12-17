package NoSqlExperiment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 声明这是一个配置类
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 定义一个Bean，该Bean是一个WebMvcConfigurer，它允许跨域请求
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        // 返回一个匿名内部类的实例，该实例实现了WebMvcConfigurer接口
        return new WebMvcConfigurer() {
            // 重写addCorsMappings方法，用于添加CORS配置
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // 允许对“/movies/**”（即以“/movies”开头的所有路径）的请求
                // 从“http://localhost:3000”这个源发出的跨域请求
                registry.addMapping("/movies/**").allowedOrigins("http://localhost:3000");
            }
        };
    }
}
