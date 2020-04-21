package com.wso2telco.dep.storeservice.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;


import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.appstore.core.dto.GenericResponse;
import org.wso2.carbon.apimgt.hostobjects.internal.ServiceReferenceHolder;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


@Path("/token")
public class TokenService {

    private static final Logger logger = Logger.getLogger(TokenService.class.getName());
    private static final String GATEWAY_URL = "APIGateway.Environments.Environment.GatewayEndpoint";

    @POST
    @Path("/revoke")
    @Produces(MediaType.APPLICATION_JSON)
    public Response revokeToken(String requestBody,
                                @HeaderParam("Authorization") String authString,
                                @HeaderParam("Content-Type") String contentType) {
        APIManagerConfiguration apiManagerConfiguration =
                ServiceReferenceHolder.getInstance().getAPIManagerConfigurationService().getAPIManagerConfiguration();
        String url = apiManagerConfiguration.getFirstProperty(GATEWAY_URL).split(",")[0] + "/revoke";

        HttpPost request = new HttpPost(url);
        // add request headers
        request.addHeader(HttpHeaders.AUTHORIZATION, authString);
        request.addHeader(HttpHeaders.CONTENT_TYPE, contentType);

        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair(requestBody.split("=")[0], requestBody.split("=")[1]));

        try {
            request.setEntity(new UrlEncodedFormEntity(urlParameters));
        } catch (UnsupportedEncodingException e) {
            logger.log(Level.SEVERE, String.join(" : ", requestBody, e.getMessage()), e);
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(request)) {
            String responseString = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8.name());
            logger.log(Level.INFO, "{0} : REVOKE", requestBody);
            return Response.status(Response.Status.OK).entity(responseString).build();
        } catch (IOException e) {
            logger.log(Level.SEVERE, String.join(" : ", requestBody, e.getMessage()), e);
            try {
                String errorJson = new ObjectMapper().writeValueAsString(new GenericResponse(true, e.getMessage()));
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorJson).build();
            } catch (JsonProcessingException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @POST
    @Path("/generate")
    @Produces(MediaType.APPLICATION_JSON)
    public Response generateToken(String requestBody,
                                  @HeaderParam("Authorization") String authString,
                                  @HeaderParam("Content-Type") String contentType) {
        APIManagerConfiguration apiManagerConfiguration =
                ServiceReferenceHolder.getInstance().getAPIManagerConfigurationService().getAPIManagerConfiguration();

        String url = apiManagerConfiguration.getFirstProperty(GATEWAY_URL).split(",")[0] + "/token";

        HttpPost request = new HttpPost(url);
        // add request headers
        request.addHeader(HttpHeaders.AUTHORIZATION, authString);
        request.addHeader(HttpHeaders.CONTENT_TYPE, contentType);

        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair(requestBody.split("&")[0].split("=")[0],
                requestBody.split("&")[0].split("=")[1]));
        urlParameters.add(new BasicNameValuePair(requestBody.split("&")[1].split("=")[0],
                requestBody.split("&")[1].split("=")[1]));
        urlParameters.add(new BasicNameValuePair(requestBody.split("&")[2].split("=")[0],
                requestBody.split("&")[2].split("=")[1]));

        try {
            request.setEntity(new UrlEncodedFormEntity(urlParameters));
        } catch (UnsupportedEncodingException e) {
            logger.log(Level.SEVERE, String.join(" : ", requestBody, e.getMessage()), e);
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(request)) {
            String responseString = EntityUtils.toString(response.getEntity(), StandardCharsets.UTF_8.name());
            logger.log(Level.INFO, "{0} : TOKEN", responseString);
            return Response.status(Response.Status.OK).entity(responseString).build();
        } catch (IOException e) {
            logger.log(Level.SEVERE, String.join(" : ", requestBody, e.getMessage()), e);
            try {
                String errorJson = new ObjectMapper().writeValueAsString(new GenericResponse(true, e.getMessage()));
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorJson).build();
            } catch (JsonProcessingException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }
}
