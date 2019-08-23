package com.wso2telco.dep.storeservice.service;

import org.wso2.carbon.authenticator.stub.AuthenticationAdminStub;
import java.net.URL;

public class LoginAdminService {
	private final String serviceName = "AuthenticationAdmin";
	private final String backEndUrl = "https://localhost:9443";
    private AuthenticationAdminStub authAdminStub; 
	
    public LoginAdminService() throws Exception {
    	authAdminStub = new AuthenticationAdminStub(null, backEndUrl + "/services/" + serviceName);
    }
    
	public boolean authenticateUser(String username, String password)
			throws Exception {
		boolean result = false;
		String host = new URL(backEndUrl).getHost();
	    if (authAdminStub.login(username, password, host)) {
	    	result = true;
	    }
	    return result;
	}
    
	public void logoutUser() throws Exception {
		authAdminStub.logout();
	}
}
