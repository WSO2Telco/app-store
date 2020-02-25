package com.wso2telco.dep.storeservice.resource;

import org.appstore.core.dto.Callback;
import org.appstore.core.dto.Reply;
import org.appstore.core.dto.Topic;
import org.appstore.core.service.ForumProcessor;
import org.appstore.core.service.iml.ForumProcessorIml;
import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.api.model.AccessTokenInfo;
import org.wso2.carbon.apimgt.impl.APIConstants;
import org.wso2.carbon.apimgt.impl.factory.KeyManagerHolder;
import org.wso2.carbon.apimgt.impl.utils.APIUtil;
import org.wso2.carbon.context.PrivilegedCarbonContext;
import org.wso2.carbon.user.core.service.RealmService;
import org.wso2.carbon.utils.multitenancy.MultitenantConstants;
import org.wso2.carbon.utils.multitenancy.MultitenantUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.wso2telco.core.userprofile.UserProfileRetriever;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;


@Path("/forum")
public class ForumService {

	private static final Logger logger = Logger.getLogger(ForumService.class.getName());
	@Context
	private UriInfo context;


	@GET
	@Path("/list/start/{start}/count/{count}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getTopics(@PathParam("start") int start,@PathParam("count") int count,@HeaderParam("authorization") String authString) {
		Response response;
		try {
			String user=null;
			if(authString.contains("basic") || authString.contains("Basic") ) {
				user=getUserFromAuth(authString);
			}else {
				user=getUserName(authString);
			}
			ForumProcessor forumProcessor=new ForumProcessorIml();
			
			UserProfileRetriever userProfileRetriever=new UserProfileRetriever();
			boolean isAdmin=userProfileRetriever.getUserProfile(user).isAdmin();

			Callback callback =forumProcessor.getTopicList(start, count,user,isAdmin);

			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(callback);

			response = Response.status(Response.Status.OK).entity(jsonString).build();
			logger.log(Level.INFO, "getTopics successfully executed ");


		} catch (Exception e) {
			response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			logger.log(Level.SEVERE, "error in getTopics: ",e);
		}
		return response;

	}

	@GET
	@Path("/list/{topicID}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getTopic(@PathParam("topicID") int topicID,@HeaderParam("authorization") String authString) {
		Response response;
		try {
			String user=null;
			if(authString.contains("basic") || authString.contains("Basic") ) {
				user=getUserFromAuth(authString);
			}else {
				user=getUserName(authString);
			}
			ForumProcessor forumProcessor=new ForumProcessorIml();
			UserProfileRetriever userProfileRetriever=new UserProfileRetriever();
			boolean isAdmin=userProfileRetriever.getUserProfile(user).isAdmin();

			Callback callback =forumProcessor.getTopic(topicID,user,isAdmin);

			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(callback);
			response = Response.status(Response.Status.OK).entity(jsonString).build();
			logger.log(Level.INFO, "getTopic successfully executed ");
		} catch (Exception e) {
			response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			logger.log(Level.SEVERE, "error in getTopic: ",e);
		}
		return response;

	}

	@GET
	@Path("/search/{keyword}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getTopicsByKeyword(@PathParam("keyword") String keyword,@HeaderParam("authorization") String authString) {
		Response response;
		try {
			String user=null;
			if(authString.contains("basic") || authString.contains("Basic") ) {
				user=getUserFromAuth(authString);
			}else {
				user=getUserName(authString);
			}
			ForumProcessor forumProcessor=new ForumProcessorIml();
			String decordedValue=getURLdecordedValue(keyword);
			UserProfileRetriever userProfileRetriever=new UserProfileRetriever();
			boolean isAdmin=userProfileRetriever.getUserProfile(user).isAdmin();
			
			Callback callback =forumProcessor.getTopicList(decordedValue,user,isAdmin);

			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(callback);


			response = Response.status(Response.Status.OK).entity(jsonString).build();
			logger.log(Level.INFO, "getTopics successfully executed ");


		} catch (Exception e) {
			response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			logger.log(Level.SEVERE, "error in getTopics: ",e);
		}
		return response;

	}


	@POST
	@Path("/createTopic")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addTopic(String jsonBody,@HeaderParam("authorization") String authString) {


		Gson gson = new GsonBuilder().serializeNulls().create();

		Topic topic = gson.fromJson(jsonBody, Topic.class);
		Response response;
		try {
			ForumProcessor forumProcessor=new ForumProcessorIml();

			String user=null;
			if(authString.contains("basic") || authString.contains("Basic") ) {
				user=getUserFromAuth(authString);
			}else {
				user=getUserName(authString);
			}
			UserProfileRetriever userProfileRetriever=new UserProfileRetriever();
			boolean isAdmin=userProfileRetriever.getUserProfile(user).isAdmin();

			Callback callback =forumProcessor.addTopic(topic,user,isAdmin);

			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(callback);
			response = Response.status(Response.Status.OK).entity(jsonString).build();
			logger.log(Level.INFO, "addTopic successfully executed ");
		} catch (Exception e) {
			response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			logger.log(Level.SEVERE, "error in addTopic: ",e);
		}
		return response;

	}

	@POST
	@Path("/deleteTopic")
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteTopic(String jsonBody,@HeaderParam("authorization") String authString) {
		Response response;
		Gson gson = new GsonBuilder().serializeNulls().create();

		Topic topic = gson.fromJson(jsonBody, Topic.class);
		try {

			String user=null;
			if(authString.contains("basic") || authString.contains("Basic") ) {
				user=getUserFromAuth(authString);
			}else {
				user=getUserName(authString);
			}
			ForumProcessor forumProcessor=new ForumProcessorIml();
			UserProfileRetriever userProfileRetriever=new UserProfileRetriever();
			boolean isAdmin=userProfileRetriever.getUserProfile(user).isAdmin();

			Callback callback =forumProcessor.deleteTopic(topic,user,isAdmin);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(callback);
			response = Response.status(Response.Status.OK).entity(jsonString).build();
			logger.log(Level.INFO, "deleteTopic successfully executed ");
		} catch (Exception e) {
			response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			logger.log(Level.SEVERE, "error in deleteTopic: ",e);
		}
		return response;

	}

	@POST
	@Path("/postReply")
	@Consumes("application/json")
	@Produces("application/json")
	public Response postReply(String jsonBody,@HeaderParam("authorization") String authString) {
		Response response;
		Gson gson = new GsonBuilder().serializeNulls().create();

		Reply reply = gson.fromJson(jsonBody, Reply.class);
		try {
			String user=null;
			if(authString.contains("basic") || authString.contains("Basic") ) {
				user=getUserFromAuth(authString);
			}else {
				user=getUserName(authString);
			}

			ForumProcessor forumProcessor=new ForumProcessorIml();
			UserProfileRetriever userProfileRetriever=new UserProfileRetriever();
			boolean isAdmin=userProfileRetriever.getUserProfile(user).isAdmin();

			Callback callback =forumProcessor.addReply(reply,user,isAdmin);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(callback);
			response = Response.status(Response.Status.OK).entity(jsonString).build();
			logger.log(Level.INFO, "postReply successfully executed ");
		} catch (Exception e) {
			response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			logger.log(Level.SEVERE, "error in postReply: ",e);
		}
		return response;

	}

	@POST
	@Path("/deleteReply")
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteReply(String jsonBody,@HeaderParam("authorization") String authString) {
		Response response;
		Gson gson = new GsonBuilder().serializeNulls().create();


		Reply reply = gson.fromJson(jsonBody, Reply.class);
		try {
			String user=null;
			if(authString.contains("basic") || authString.contains("Basic") ) {
				user=getUserFromAuth(authString);
			}else {
				user=getUserName(authString);
			}

			ForumProcessor forumProcessor=new ForumProcessorIml();
			UserProfileRetriever userProfileRetriever=new UserProfileRetriever();
			boolean isAdmin=userProfileRetriever.getUserProfile(user).isAdmin();

			Callback callback =forumProcessor.deleteReply(reply,user,isAdmin);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(callback);
			response = Response.status(Response.Status.OK).entity(jsonString).build();
			logger.log(Level.INFO, "deleteReply successfully executed ");
		} catch (Exception e) {
			response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			logger.log(Level.SEVERE, "error in deleteReply: ",e);
		}
		return response;

	}

	private String getUserFromAuth(String auth) {

		String[] authAsArray=auth.split(" ");
		String base64encodedAuth=authAsArray[authAsArray.length-1];

		byte[] decodedBytes = Base64.getDecoder().decode(base64encodedAuth);
		String decodedString = new String(decodedBytes);

		String[] decodedStringArray=decodedString.split(":");

		String user=decodedStringArray[0];
		return user;

	}

	private String getURLdecordedValue(String value) throws UnsupportedEncodingException {

		String encordedvalue = java.net.URLDecoder.decode(value, StandardCharsets.UTF_8.name());
		

		return encordedvalue;
	}
	
	
	public String getUserName(String authHeader) {
		String[] authAsArray=authHeader.split(" ");
        String accessToken = authAsArray[authAsArray.length-1];;
        String userNameToReturn=null;
        AccessTokenInfo tokenInfo = null;
        try {
            tokenInfo = KeyManagerHolder.getKeyManagerInstance().getTokenMetaData(accessToken);
        } catch (APIManagementException e) {
			logger.log(Level.SEVERE, "Error while retrieving token information for token: " + accessToken,e);

        }
        // if we got valid access token we will proceed with next
        if (tokenInfo != null && tokenInfo.isTokenValid()) {

            //If scope validation successful then set tenant name and user name to current context
            String tenantDomain = MultitenantUtils.getTenantDomain(tokenInfo.getEndUserName());
            String superTenentSuffix = APIConstants.EMAIL_DOMAIN_SEPARATOR + MultitenantConstants.SUPER_TENANT_DOMAIN_NAME;
            String username = tokenInfo.getEndUserName();
			if (MultitenantConstants.SUPER_TENANT_DOMAIN_NAME.equals(tenantDomain)) {
			    if (username.endsWith(superTenentSuffix)) {
			        username = username.substring(0, username.length() - superTenentSuffix.length());
			        userNameToReturn=username;
			    }
			}
        } else {
			logger.log(Level.SEVERE, "Error in getUserName");

        }
        return userNameToReturn;
    }


}
