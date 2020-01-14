package com.wso2telco.dep.storeservice.resource;

import org.appstore.core.dto.GenericResponseWithIDs;
import org.appstore.core.dto.Reply;
import org.appstore.core.dto.Topic;
import org.appstore.core.service.ForumProcessor;
import org.appstore.core.service.iml.ForumProcessorIml;
import com.wso2telco.core.dbutils.util.Callback;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;


@Path("/forum")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ForumService {

	
	  private static final Logger logger = Logger.getLogger(ForumService.class.getName());

    @GET
    @Path("/list/start/{start}/count/{count}")
    public Response getTopics(@PathParam("start") int start,@PathParam("count") int count) {
        Response response;
        try {
        	ForumProcessor forumProcessor=new ForumProcessorIml();
           
            Callback callback =forumProcessor.getTopicList(start, count);
            response = Response.status(Response.Status.OK).entity(callback).build();
            logger.log(Level.INFO, "getTopics successfully executed ");
           

        } catch (Exception e) {
            response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            logger.log(Level.SEVERE, "error in getTopics: ",e);
        }
        return response;
        
    }
    
    @GET
    @Path("/list/{topicID}")
    public Response getTopic(@PathParam("topicID") int topicID) {
    	 Response response;
         try {
         	ForumProcessor forumProcessor=new ForumProcessorIml();
            
             Callback callback =forumProcessor.getTopic(topicID);
             response = Response.status(Response.Status.OK).entity(callback).build();
             logger.log(Level.INFO, "getTopic successfully executed ");
         } catch (Exception e) {
             response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
             logger.log(Level.SEVERE, "error in getTopic: ",e);
         }
         return response;
        
    }


    @POST
    @Path("/createTopic")
    public Response addTopic(Topic topic) {
    	 Response response;
         try {
         	ForumProcessor forumProcessor=new ForumProcessorIml();
            
         	Callback callback =forumProcessor.addTopic(topic);

         	response = Response.status(Response.Status.OK).entity(callback).build();
             logger.log(Level.INFO, "addTopic successfully executed ");
         } catch (Exception e) {
             response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
             logger.log(Level.SEVERE, "error in addTopic: ",e);
         }
         return response;
         
    }

    @POST
    @Path("/deleteTopic")
    public Response deleteTopic(Topic topic) {
    	 Response response;
         try {
         	
         	ForumProcessor forumProcessor=new ForumProcessorIml();
            
         	Callback callback =forumProcessor.deleteTopic(topic);
         	response = Response.status(Response.Status.OK).entity(callback).build();
             logger.log(Level.INFO, "deleteTopic successfully executed ");
         } catch (Exception e) {
             response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
             logger.log(Level.SEVERE, "error in deleteTopic: ",e);
         }
         return response;
         
    }

    @POST
    @Path("/postReply")
    public Response postReply(Reply reply) {
    	 Response response;
         try {
         	
         	ForumProcessor forumProcessor=new ForumProcessorIml();
            
         	Callback callback =forumProcessor.addReply(reply);
         	response = Response.status(Response.Status.OK).entity(callback).build();
             logger.log(Level.INFO, "postReply successfully executed ");
         } catch (Exception e) {
             response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
             logger.log(Level.SEVERE, "error in postReply: ",e);
         }
         return response;
         
    }
    
    @POST
    @Path("/deleteReply")
    public Response deleteReply(Reply reply) {
    	 Response response;
         try {
         	
         	ForumProcessor forumProcessor=new ForumProcessorIml();
            
         	Callback callback =forumProcessor.deleteReply(reply);
         	response = Response.status(Response.Status.OK).entity(callback).build();
             logger.log(Level.INFO, "deleteReply successfully executed ");
         } catch (Exception e) {
             response =  Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
             logger.log(Level.SEVERE, "error in deleteReply: ",e);
         }
         return response;
         
    }

	
}
