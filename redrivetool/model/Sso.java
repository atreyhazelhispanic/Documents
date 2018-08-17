package com.nordstrom.tds.pvo.redrivetool.model;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class Sso {
    private final int uriPort = 3000;
    private final String uri = "http://localhost:" + Integer.toString(uriPort);
    private final String url = "https://signin-preview.nauth.nordstrom.com/login/default" +
            "/?client_id=0oaefntmu0G8Dvk0D0h7&env=test&response_type=code&scopes=openid user group_sids email first_name " +
            "last_name distinguished_name profile&redirect_uri=" + uri;
    private ResponseEntity<String> getNAuth;

    public Sso(){}

    public ResponseEntity<String> getNAuth()  {return getNAuth;}

    public String getUrl() {return url;}
}
