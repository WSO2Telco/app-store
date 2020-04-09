package com.wso2telco.dep.storeservice.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/oauth2")
public class TokenService {

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    @RequestMapping(value = "/revoke", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity revokeToken(@RequestBody String revokeBody,
                                      @RequestHeader(value = "Content-Type") String contentType,
                                      @RequestHeader(value = "Authorization") String Authorization){
        logger.info("********************revokeBody************" + revokeBody);
        logger.info("********************contentType************" + contentType);
        logger.info("********************Authorization************" + Authorization);
        ResponseEntity responseEntity = null;
        return responseEntity;
    }
}
