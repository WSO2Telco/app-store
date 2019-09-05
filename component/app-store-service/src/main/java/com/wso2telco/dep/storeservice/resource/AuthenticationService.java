package com.wso2telco.dep.storeservice.resource;

import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.appstore.core.dto.AuthenticationRequest;
import org.appstore.core.dto.GenericResponse;
import org.appstore.core.util.InputValidator;
import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.hostobjects.internal.HostObjectComponent;
import org.wso2.carbon.apimgt.hostobjects.internal.ServiceReferenceHolder;
import org.wso2.carbon.apimgt.impl.APIConstants;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;
import org.wso2.carbon.authenticator.stub.AuthenticationAdminStub;
import org.wso2.carbon.core.util.PermissionUpdateUtil;
import org.wso2.carbon.utils.multitenancy.MultitenantUtils;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URL;

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

    private static final Log log = LogFactory.getLog(AuthenticationService.class);

    @POST
    @Path("/login")
    public Response login(AuthenticationRequest authenticationRequest) {

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
            if (!authAdminStub.login(authenticationRequest.getUsername(), authenticationRequest.getPassword(), host)) {
                response = Response.status(Response.Status.OK)
                        .entity(new GenericResponse(true, "Login failed. Please recheck the username and password and try again."))
                        .build();
            } else {
                response = Response.status(Response.Status.OK)
                        .entity(new GenericResponse(false, "SUCCESS"))
                        .build();
            }
        } catch (Exception e) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(new GenericResponse(true, e.getMessage()))
                .build();
        }
        return response;
    }


    @GET
    @Path("/logout")
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

            response = Response.status(Response.Status.OK)
                .entity(new GenericResponse(false, "SUCCESS"))
                .build();
        } catch (Exception e) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(new GenericResponse(true, e.getMessage()))
                .build();
        }
        return response;
    }

    private static void handleException(String msg) throws APIManagementException {
        log.error(msg);
        throw new APIManagementException(msg);
    }
}
