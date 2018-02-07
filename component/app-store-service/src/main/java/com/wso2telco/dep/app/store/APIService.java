package com.wso2telco.dep.app.store;


import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("/applications")
class APIService {

    @GET
    public Response assignApplication() {
        String output = "Hi REST";
		return Response.status(200).entity(output).build();
    }
}


