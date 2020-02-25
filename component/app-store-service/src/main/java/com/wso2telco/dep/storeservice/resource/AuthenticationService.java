package com.wso2telco.dep.storeservice.resource;

import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;
import org.appstore.core.dto.AuthenticationRequest;
import org.appstore.core.dto.GenericResponse;
import org.appstore.core.dto.LoginResponse;
import org.appstore.core.util.InputValidator;
import org.appstore.core.util.UserInfoServiceUtil;
import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.hostobjects.internal.HostObjectComponent;
import org.wso2.carbon.apimgt.hostobjects.internal.ServiceReferenceHolder;
import org.wso2.carbon.apimgt.impl.APIConstants;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;
import org.wso2.carbon.authenticator.stub.AuthenticationAdminStub;
import org.wso2.carbon.core.util.PermissionUpdateUtil;
import org.wso2.carbon.utils.multitenancy.MultitenantUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;

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
@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthenticationService {

    private static final Logger logger = Logger.getLogger(AuthenticationService.class.getName());

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(String jsonBody) {

    	Gson gson = new GsonBuilder().serializeNulls().create();

    	AuthenticationRequest authenticationRequest = gson.fromJson(jsonBody, AuthenticationRequest.class);
        Response response;
        try {
            InputValidator.validateUserInput("Username", authenticationRequest.getUsername());
            InputValidator.validateUserInput("Password", authenticationRequest.getPassword());

            APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();
            String url = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
            if (url == null) {
                handleException("API key manager URL unspecified");
            }

            AuthenticationAdminStub authAdminStub = new AuthenticationAdminStub(null, url + "AuthenticationAdmin");
            ServiceClient client = authAdminStub._getServiceClient();
            Options options = client.getOptions();
            options.setManageSession(true);

            String tenantDomain = MultitenantUtils.getTenantDomain(authenticationRequest.getUsername());
            //update permission cache before validate user
            int tenantId =  ServiceReferenceHolder.getInstance().getRealmService().getTenantManager()
                    .getTenantId(tenantDomain);
            if(tenantId == org.wso2.carbon.base.MultitenantConstants.INVALID_TENANT_ID) {
                handleException("Invalid tenant domain");
            }
            PermissionUpdateUtil.updatePermissionTree(tenantId);

            String host = new URL(url).getHost();
            logger.log(Level.INFO, "login user : " + authenticationRequest.getUsername());
            if (!authAdminStub.login(authenticationRequest.getUsername(), authenticationRequest.getPassword(), host)) {
               
            	ObjectMapper mapper = new ObjectMapper();
    			//Converting the Object to JSONString
    			String jsonString = mapper.writeValueAsString(new GenericResponse(true, "Login failed. Please recheck the username and password and try again."));
    			response = Response.status(Response.Status.OK).entity(jsonString).build();
            	
                logger.log(Level.WARNING, "Invalid username or password, Login failed");
            } else {

            	ObjectMapper mapper = new ObjectMapper();
    			//Converting the Object to JSONString

				String theme = UserInfoServiceUtil.getTheme(authenticationRequest.getUsername());
    			String jsonString = mapper.writeValueAsString(new LoginResponse(false, "SUCCESS", theme));
    			response = Response.status(Response.Status.OK).entity(jsonString).build();
                

                logger.log(Level.INFO, authenticationRequest.getUsername() + " successfully logged in");
            }
        } catch (Exception e) {
        	ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, e.getMessage()));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();
			}
			
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(jsonString)
                .build();
            logger.log(Level.WARNING, "Login failed, internal error occurred", e);
        }
        return response;
    }

    @GET
    @Path("/logout")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout() {
        Response response;
        try {
            APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();
            String url = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
            if (url == null) {
                handleException("API key manager URL unspecified");
            }

            AuthenticationAdminStub authAdminStub = new AuthenticationAdminStub(null, url + "AuthenticationAdmin");
            authAdminStub.logout();
            
            ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(new GenericResponse(false, "SUCCESS"));
			response = Response.status(Response.Status.OK).entity(jsonString).build();


            
            logger.log(Level.INFO, "successfully logged out");
        } catch (Exception e) {
        	
        	ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, e.getMessage()));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();
			}
			

            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(jsonString)
                .build();
            logger.log(Level.WARNING, "Logging out failed, internal error occurred", e);
        }
        return response;
    }

    private static void handleException(String msg) throws APIManagementException {
        logger.log(Level.WARNING, msg);
        throw new APIManagementException(msg);
    }
}
