package com.nordstrom.tds.pvo.redrivetool.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedriveConfig {
    @Value("${foo:5}")
    int foo;

    public int getFoo(){
        return foo;
    }
}