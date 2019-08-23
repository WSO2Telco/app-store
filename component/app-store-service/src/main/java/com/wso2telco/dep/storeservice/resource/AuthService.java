/**
 * Copyright (c) 2016, WSO2.Telco Inc. (http://www.wso2telco.com) All Rights Reserved.
 * <p>
 * WSO2.Telco Inc. licences this file to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.wso2telco.dep.storeservice.resource;

import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.QueryParam;

import com.wso2telco.dep.storeservice.service.LoginAdminService;
import com.wso2telco.dep.storeservice.model.Result;
import com.wso2telco.dep.storeservice.model.User;

@Path("/auth")
public class AuthService {

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLogin(User user) {
        Response response;
        Result resultObj = new Result();
        try {
        	LoginAdminService loginAdminService = new LoginAdminService();
        	if (loginAdminService.authenticateUser(user.getUsername(), user.getPassword())) {
        		resultObj.setError(false);
        		resultObj.setMessage("");
        	} else {
        		resultObj.setError(true);
        		resultObj.setMessage("Login failed. Please recheck the username and password and try again.");
        	}
            response = Response.status(Response.Status.OK).entity(resultObj).build();
        } catch (Exception e) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return response;
    }

    @GET
    @Path("/logout")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLogout() {
        Response response;
        Result resultObj = new Result();
        try {
        	LoginAdminService loginAdminService = new LoginAdminService();
        	loginAdminService.logoutUser();
        	resultObj.setError(false);
        	resultObj.setMessage("");
            response = Response.status(Response.Status.OK).entity(resultObj).build();
        } catch (Exception e) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    	return response;
    }

    @GET
    @Path("/test")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getTest() {
    	String result = "test successful " + new Date().toString();
    	Response response = Response.status(Response.Status.OK).entity(result).build();
    	return response;
    }
}
