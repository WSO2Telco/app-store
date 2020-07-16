/*
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

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.wso2telco.core.dbutils.exception.BusinessException;
import org.appstore.core.dto.Callback;
import org.appstore.core.dto.ResponseFilter;
import org.appstore.core.service.ResponseFilterProcessor;
import org.appstore.core.service.iml.ResponseFilterProcessorIml;

@Path("/response-filter")
public class ResponseFilterService {

    private static final Logger logger = Logger.getLogger(ResponseFilterService.class.getName());

    @POST
    @Path("/")
    @Consumes("application/json")
    @Produces("application/json")
    public Response add(String payload) {
        Gson gson = new GsonBuilder().serializeNulls().create();
        ResponseFilter responseFilter = gson.fromJson(payload, ResponseFilter.class);
        Response response;
        try {
            ResponseFilterProcessor processor = new ResponseFilterProcessorIml();
            Callback callback = processor.addResponseFilter(responseFilter);
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(callback);
            response = Response.status(Response.Status.OK).entity(jsonString).build();
            logger.log(Level.INFO, "add response filter successfully executed");
        } catch (BusinessException | JsonProcessingException exception) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            logger.log(Level.SEVERE, "error in add response filter : ", exception);
        }
        return response;
    }

    @GET
    @Path("/")
    @Consumes("application/json")
    @Produces("application/json")
    public Response find(@QueryParam("sp") String sp, @QueryParam("application") String application,
                         @QueryParam("api") String api, @QueryParam("operation") String operation) {
        Response response;
        try {
            ResponseFilterProcessor processor = new ResponseFilterProcessorIml();
            Callback callback = processor.findResponseFilter(sp, application, api, operation);
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(callback);
            response = Response.status(Response.Status.OK).entity(jsonString).build();
            logger.log(Level.INFO, "find response filter successfully executed");
        } catch (BusinessException | JsonProcessingException exception) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            logger.log(Level.SEVERE, "error in find response filter : ", exception);
        }
        return response;
    }

    @GET
    @Path("/{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public Response findById(@PathParam("id") String id) {
        Response response;
        try {
            ResponseFilterProcessor processor = new ResponseFilterProcessorIml();
            Callback callback = processor.findResponseFilter(Integer.parseInt(id));
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(callback);
            response = Response.status(Response.Status.OK).entity(jsonString).build();
            logger.log(Level.INFO, "find response filter by ID successfully executed");
        } catch (BusinessException | JsonProcessingException exception) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            logger.log(Level.SEVERE, "error in find response filter by ID : ", exception);
        }
        return response;
    }

    @DELETE
    @Path("/{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public Response delete(@PathParam("id") String id) {
        Response response;
        try {
            ResponseFilterProcessor processor = new ResponseFilterProcessorIml();
            Callback callback = processor.deleteResponseFilter(Integer.parseInt(id));
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(callback);
            response = Response.status(Response.Status.OK).entity(jsonString).build();
            logger.log(Level.INFO, "delete response filter successfully executed");
        } catch (BusinessException | JsonProcessingException exception) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            logger.log(Level.SEVERE, "error in delete response filter : ", exception);
        }
        return response;
    }
}
