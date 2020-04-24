package com.wso2telco.dep.storeservice.resource;

import com.google.gson.Gson;
import org.appstore.core.util.SwaggerDefServiceUtil;
import org.wso2.carbon.registry.core.exceptions.RegistryException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("/swagger")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class SwaggerService {

    private static final Logger logger = Logger.getLogger(SwaggerService.class.getName());
    private static final  int tenantID = -1234;

    @GET
    @Path("/{apiname}/{apiversion}/{providername}/{username}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIt(@PathParam("apiname") String apiNameVal, @PathParam("apiversion") String apiVersionVal, @PathParam("providername") String providerVal, @PathParam("username") String userNameVal) {
        Response response;

        try {
            Gson gson = new Gson();
            SwaggerDefServiceUtil swaggerDefServiceUtil = new SwaggerDefServiceUtil();
            String JsonResponse = swaggerDefServiceUtil.getSwaggerData(apiNameVal,apiVersionVal,providerVal,tenantID,userNameVal);
            response = Response.status(Response.Status.OK).entity(JsonResponse).build();

        } catch (RegistryException e) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            logger.log(Level.SEVERE, "Registry exception : ", e);
        } catch (Exception e){
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            logger.log(Level.SEVERE, "Error get swagger : ", e);
        }
        return response;
    }
}
