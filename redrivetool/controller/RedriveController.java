package com.nordstrom.tds.pvo.redrivetool.controller;
import com.nordstrom.tds.pvo.redrivetool.model.Redrive;
import com.nordstrom.tds.pvo.redrivetool.model.Sso;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedriveController {
    private Redrive redrive;
    private final Sso sso = new Sso();
    private ResponseEntity<String> res;

    //Map the rest controller function from the redrive path
    @RequestMapping(value = "/redrive", method=RequestMethod.POST)
    //Create a redrive object with default value and also defines the parameters themselves
    public ResponseEntity<String> redrive(@RequestParam(value = "environment") String env,
                                          @RequestParam(value = "type") String type,
                                          @RequestParam(value = "market") String market,
                                          @RequestParam(value = "catalog") String catalog,
                                          @RequestParam(value = "id") int id) {
        //Create new object redrive, with parameters defined above
        redrive = new Redrive(env, type, market, catalog, id);
        //Call defined action method on the URL string
        redrive.doRedrive();
        //Pull the response for pass back
        res = redrive.getResponse();
        return res;
    }

//    //Map the rest controller function from the login path
//    @RequestMapping(value = "/login")
//    public RedirectView redirect() {
//        RedirectView redirectView = new RedirectView();
//        //Redirect page to Nordstrom nauth login page
//        redirectView.setUrl(sso.getUrl());
//        return redirectView;
//    }
}