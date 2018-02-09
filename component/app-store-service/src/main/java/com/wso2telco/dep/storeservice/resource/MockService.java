package com.wso2telco.dep.storeservice.resource;

import com.wso2telco.core.dbutils.util.Callback;
import com.wso2telco.core.userprofile.UserProfileRetriever;
import com.wso2telco.core.userprofile.dto.UserProfileDTO;
import org.appstore.core.service.AppStoreDelegator;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
@Path("/mock")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MockService {

    @GET
    public Response getIt() {
        Response response;
        try {
            AppStoreDelegator appStoreDelegator = new AppStoreDelegator();
            UserProfileRetriever userProfileRetriever = new UserProfileRetriever();
            UserProfileDTO userProfile = userProfileRetriever.getUserProfile("admin");
            Callback callback =appStoreDelegator.getApis(userProfile);
            response = Response.status(Response.Status.OK).entity(callback).build();
        } catch (Exception e) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return response;
    }
}
