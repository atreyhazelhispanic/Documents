package com.nordstrom.tds.pvo.redrivetool.model;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class Redrive {
    //Private placeholders for values being entered
    private final String type, env, market, catalog;
    private final int id;
    private final boolean downStream = true;
    private ResponseEntity<String> response;
    private final String tstBase = "http://ingest-tst.nonprod.product.r53.nordstrom.net/ingest/",
        shdBase = "http://ingest-shd.prod.product.r53.nordstrom.net/ingest/",
        sit01Base = "http://ingest-sit01.nonprod.product.r53.nordstrom.net/ingest/",
        sit02Base = "http://ingest-sit02.nonprod.product.r53.nordstrom.net/ingest/",
        prdBase = "http://ingest-prd.prod.product.r53.nordstrom.net/ingest/",
        prfBase = "http://ingest-prf.nonprod.product.r53.nordstrom.net/ingest/",
        postUrl = "&sendDownStreamEvent=" + String.valueOf(downStream);

    //The Redrive Object with necessary parameters for ingest
    public Redrive(String env, String type, String market, String catalog, int id){
        this.id = id;
        this.env = env;
        this.type = type;
        this.market = market;
        this.catalog = catalog;
    }

    //Action of ingesting after URL is submitted
    public void doRedrive(){
        String url = type + "/" + id + "?market=" + market + "&catalog=" + catalog + postUrl;

        RestTemplate restTemplate = new RestTemplate();
        //String fooResourceUrl = "https://nps2.prod.product.vip.nordstrom.com/health";

        if(env.equalsIgnoreCase("tst")){
            url = tstBase + url;
        }else if(env.equalsIgnoreCase("shd")){
            url = shdBase + url;
        }else if(env.equalsIgnoreCase("sit01")){
            url = sit01Base + url;
        }else if(env.equalsIgnoreCase("sit02")){
            url = sit02Base + url;
        }else if(env.equalsIgnoreCase("prd")){
            url = prdBase + url;
        }else if(env.equalsIgnoreCase("prf")){
            url = prfBase + url;
        }else{
            throw new IllegalArgumentException("Environment specification is incorrect.");
        }

        response = restTemplate.getForEntity(url, String.class);
    }

    //getters for the values
    public int getId(){return id;}

    public String getEnv(){return env;}

    public String getType() {return type;}

    public String getMarket(){return market;}

    public String getCatalog(){return catalog;}

    public ResponseEntity<String> getResponse(){return response;}
}
