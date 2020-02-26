package com.wso2telco.dep.storeservice.resource;

import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;
import org.apache.axis2.transport.http.HTTPConstants;
import org.appstore.core.dto.AuthenticationRequest;
import org.appstore.core.dto.ChangePasswordByUsrRequest;
import org.appstore.core.dto.ChangePasswordRequest;
import org.appstore.core.dto.GenericResponse;
import org.appstore.core.dto.ResetPasswordRequest;
import org.appstore.core.dto.UserRequest;
import org.appstore.core.exception.ApiException;
import org.appstore.core.exception.InvalidInputException;
import org.appstore.core.util.InputType;
import org.appstore.core.util.InputValidator;
import org.appstore.core.util.UserInfoServiceUtil;
import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.hostobjects.HostObjectUtils;
import org.wso2.carbon.apimgt.hostobjects.internal.HostObjectComponent;
import org.wso2.carbon.apimgt.hostobjects.internal.ServiceReferenceHolder;
import org.wso2.carbon.apimgt.impl.APIConstants;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;
import org.wso2.carbon.apimgt.impl.dto.UserRegistrationConfigDTO;
import org.wso2.carbon.apimgt.impl.dto.WorkflowDTO;
import org.wso2.carbon.apimgt.impl.utils.APIUtil;
import org.wso2.carbon.apimgt.impl.utils.SelfSignUpUtil;
import org.wso2.carbon.apimgt.impl.workflow.WorkflowConstants;
import org.wso2.carbon.apimgt.impl.workflow.WorkflowException;
import org.wso2.carbon.apimgt.impl.workflow.WorkflowExecutor;
import org.wso2.carbon.apimgt.impl.workflow.WorkflowExecutorFactory;
import org.wso2.carbon.apimgt.impl.workflow.WorkflowStatus;
import org.wso2.carbon.authenticator.stub.AuthenticationAdminStub;
import org.wso2.carbon.authenticator.stub.LoginAuthenticationExceptionException;
import org.wso2.carbon.base.MultitenantConstants;
import org.wso2.carbon.context.PrivilegedCarbonContext;
import org.wso2.carbon.core.util.PermissionUpdateUtil;
import org.wso2.carbon.identity.mgt.stub.UserIdentityManagementAdminServiceStub;
import org.wso2.carbon.identity.mgt.stub.beans.VerificationBean;
import org.wso2.carbon.identity.user.registration.stub.UserRegistrationAdminServiceException;
import org.wso2.carbon.identity.user.registration.stub.UserRegistrationAdminServiceStub;
import org.wso2.carbon.identity.user.registration.stub.dto.UserDTO;
import org.wso2.carbon.identity.user.registration.stub.dto.UserFieldDTO;
import org.wso2.carbon.user.core.UserCoreConstants;
import org.wso2.carbon.user.core.UserRealm;
import org.wso2.carbon.user.core.UserStoreManager;
import org.wso2.carbon.user.core.service.RealmService;
import org.wso2.carbon.user.mgt.stub.UserAdminStub;
import org.wso2.carbon.user.mgt.stub.UserAdminUserAdminException;
import org.wso2.carbon.utils.CarbonUtils;
import org.wso2.carbon.utils.multitenancy.MultitenantUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.net.MalformedURLException;
import java.net.URL;
import java.rmi.RemoteException;
import java.util.Arrays;
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
@Path("/user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserService {

	private static final Logger logger = Logger.getLogger(UserService.class.getName());

	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response add(String jsonBody) {

		Gson gson = new GsonBuilder().serializeNulls().create();

		UserRequest userRequest = gson.fromJson(jsonBody, UserRequest.class);
		Response response;
		try {
			InputValidator.validateUserInput("Username", userRequest.getUsername(), InputType.NAME);
			InputValidator.validateUserInput("Password", userRequest.getPassword(), InputType.PASSWORD);

			String[] allFieldValues = userRequest.getAllFieldsValues().split("\\|");
			for (int i = 0; i < allFieldValues.length; i++) {
				if (i == AllFieldValue.FIRST_NAME.getPosition()) {
					InputValidator.validateUserInput("First Name", allFieldValues[i], InputType.NAME);
				} else if (i == AllFieldValue.LAST_NAME.getPosition()) {
					InputValidator.validateUserInput("Last Name", allFieldValues[i], InputType.NAME);
				} else if (i == AllFieldValue.EMAIL.getPosition()) {
					InputValidator.validateUserInput("Email", allFieldValues[i], InputType.EMAIL);
				}
			}

			if(isUserExists(userRequest.getUsername())) {
				UserInfoServiceUtil.handleException("User name already exists");
			}

			addUser(userRequest.getUsername(), userRequest.getPassword(), userRequest.getAllFieldsValues());

			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(new GenericResponse(false, "SUCCESS"));
			response = Response.status(Response.Status.OK).entity(jsonString).build();

			logger.log(Level.INFO, "user added successfully : " + userRequest.getUsername());
		} catch (ApiException | InvalidInputException e) {
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, e.getMessage()));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();
			}
			response = Response.status(Response.Status.OK).entity(jsonString).build();

			logger.log(Level.WARNING, "Error occurred while adding user");
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
			logger.log(Level.WARNING, "Internal server error occurred while adding user", e);
		}
		return response;
	}
	
	@GET
	@Path("/theme/{user}")
	public Response getTheme(@PathParam("user") String username) {
		Response response;
		try {
			InputValidator.validateUserInput("Username", username, InputType.NAME);
			if (!isUserExists(username)) {
				UserInfoServiceUtil.handleException("User does not exists");
			}
			String theme = UserInfoServiceUtil.getTheme(username);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(theme);
			response = Response.status(Response.Status.OK).
					entity(jsonString).build();
		} catch (InvalidInputException e) {
			logger.log(Level.WARNING, "Invalid username or password" + e);
			
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, "Incorrect Username pattern"));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}

			response =  Response.status(Response.Status.OK)
					.entity(jsonString)
					.build();
			
			
		} catch (ApiException e) {
			logger.log(Level.WARNING, "User does not exists" + e);
			
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, "Login failed. Please recheck the username"));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}

			response =  Response.status(Response.Status.OK)
					.entity(jsonString)
					.build();
			
		} catch (APIManagementException e) {
			logger.log(Level.WARNING, "user existence check failed" + e);
			
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, "user existence check failed"));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}

			response =  Response.status(Response.Status.OK)
					.entity(jsonString)
					.build();
			
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
			logger.log(Level.WARNING, "Internal server error occurred while adding user", e);
		}
		return response;
	}

	@POST
	@Path("/theme")
	public Response setTheme(String jsonBody) {
		Response response;
		boolean status;
		
		Gson gson = new GsonBuilder().serializeNulls().create();

		ResetPasswordRequest resetPasswordRequest = gson.fromJson(jsonBody, ResetPasswordRequest.class);

		try {
			InputValidator.validateUserInput("Username", resetPasswordRequest.getUsername(), InputType.NAME);
			if (!isUserExists(resetPasswordRequest.getUsername())) {
				UserInfoServiceUtil.handleException("User does not exists");
			}
			status = UserInfoServiceUtil.setTheme(resetPasswordRequest.getUsername(), resetPasswordRequest.getTheme());
			if (status) {
				ObjectMapper mapper = new ObjectMapper();
				//Converting the Object to JSONString
				String jsonString = mapper.writeValueAsString(new GenericResponse(false, "theme updated successfully"));
				response = Response.status(Response.Status.OK).entity(jsonString).build();
			} else {
				ObjectMapper mapper = new ObjectMapper();
				//Converting the Object to JSONString
				String jsonString = mapper.writeValueAsString(new GenericResponse(true, "Theme update failed"));
				response = Response.status(Response.Status.OK).entity(jsonString).build();
			}
		} catch (InvalidInputException e) {
			logger.log(Level.WARNING, "Invalid username or password" + e);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, "Incorrect Username pattern"));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}

			response =  Response.status(Response.Status.OK)
					.entity(jsonString)
					.build();
			
		} catch (ApiException e) {
			logger.log(Level.WARNING, "User does not exists" + e);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, "Login failed. Please recheck the username"));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}

			response =  Response.status(Response.Status.OK)
					.entity(jsonString)
					.build();

		} catch (APIManagementException e) {
			logger.log(Level.WARNING, "user existence check failed" + e);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, "user existence check failed"));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}

			response =  Response.status(Response.Status.OK)
					.entity(jsonString)
					.build();

		
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
			logger.log(Level.WARNING, "Internal server error occurred while adding user", e);
		}
		return response;
	}

	@POST
	@Path("/update-password")
	public Response updatePassword(String jsonBody) {
		Response response;
		Gson gson = new GsonBuilder().serializeNulls().create();

		ResetPasswordRequest resetPasswordRequest = gson.fromJson(jsonBody, ResetPasswordRequest.class);

		try {
			InputValidator.validateUserInput("Username", resetPasswordRequest.getUsername(), InputType.NAME);
			InputValidator.validateUserInput("Password", resetPasswordRequest.getNewPassword(), InputType.PASSWORD);

			UserInfoServiceUtil userInfoServiceUtil = UserInfoServiceUtil.getInstance();
			userInfoServiceUtil.getUserInfoService(UserInfoServiceUtil.getSessionCookie());
			VerificationBean verificationBean = userInfoServiceUtil.updatePassword(resetPasswordRequest.getUsername(), resetPasswordRequest.getCode(),
					/*resetPasswordRequest.getCaptcha(),*/resetPasswordRequest.getNewPassword());
			
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(new GenericResponse(false, "password updated successfully"));
			response = Response.status(Response.Status.OK).entity(jsonString).build();
			
			
		} catch (Exception e) {
			logger.log(Level.WARNING, "Error while updating password.Please try again later " + e);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, e.getMessage()));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}

			response =  Response.status(Response.Status.OK)
					.entity(jsonString)
					.build();
			
		}
		return response;
	}

	@POST
	@Path("/forget-password")
	public Response sendNotification(String jsonBody) {
		Response response;
		Gson gson = new GsonBuilder().serializeNulls().create();

		ResetPasswordRequest resetPasswordRequest = gson.fromJson(jsonBody, ResetPasswordRequest.class);

		try {
			InputValidator.validateUserInput("Username", resetPasswordRequest.getUsername(), InputType.NAME);
			UserInfoServiceUtil userInfoServiceUtil = UserInfoServiceUtil.getInstance();
			userInfoServiceUtil.getUserInfoService(UserInfoServiceUtil.getSessionCookie());

			if(!isUserExists(resetPasswordRequest.getUsername())) {
				UserInfoServiceUtil.handleException("User does not exists");
			}

			VerificationBean verificationBean = userInfoServiceUtil.sendNotification(resetPasswordRequest.getUsername());
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(new GenericResponse(false, "notification sent successfully"));
			response = Response.status(Response.Status.OK).entity(jsonString).build();
			
			
		} catch (Exception e) {
			logger.log(Level.WARNING, "Error occurred while sending notification. Please try again later" + e);
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, e.getMessage()));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'status':'fail'}").build();

			}

			response =  Response.status(Response.Status.OK)
					.entity(jsonString)
					.build();
		}
		return response;
	}

	@POST
	@Path("change-password-by-user")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response changePasswordByUser(String jsonBody, @HeaderParam("authorization") String authString) {
		Response response;
		boolean isTenantFlowStarted = false;
		String sessionCookie = "";
		Gson gson = new GsonBuilder().serializeNulls().create();

		ChangePasswordByUsrRequest changePasswordReq = gson.fromJson(jsonBody, ChangePasswordByUsrRequest.class);

		try {
			InputValidator.validateUserInput("Current Password", changePasswordReq.getCurrentPassword());
			InputValidator.validateUserInput("New Password", changePasswordReq.getNewPassword(), InputType.PASSWORD);

			String authUsername = null;
			String authPassword = null;
			try {
				String[] decodedAuthParts = new String(Base64.getDecoder().decode(authString.split("\\s+")[1]), StandardCharsets.UTF_8).split(":");
				authUsername = decodedAuthParts[0];
				authPassword = decodedAuthParts[1];
			} catch (Exception e) {
				UserInfoServiceUtil.handleException("User authentication failed");
			}

			APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();
			String serverURL = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
			String tenantDomain = MultitenantUtils.getTenantDomain(APIUtil.replaceEmailDomainBack(authUsername));

			AuthenticationAdminStub authAdminStub = new AuthenticationAdminStub(null, serverURL + "AuthenticationAdmin");
			Options authOptions = authAdminStub._getServiceClient().getOptions();
			authOptions.setManageSession(true);
			int tenantId =  ServiceReferenceHolder.getInstance().getRealmService().getTenantManager().getTenantId(tenantDomain);
			if(tenantId == org.wso2.carbon.base.MultitenantConstants.INVALID_TENANT_ID) {
				UserInfoServiceUtil.handleException("Invalid tenant domain");
			}
			PermissionUpdateUtil.updatePermissionTree(tenantId);
			if(authAdminStub.login(authUsername, authPassword, new URL(serverURL).getHost())) {
				sessionCookie = (String) authAdminStub._getServiceClient().getLastOperationContext().getServiceContext().getProperty(HTTPConstants.COOKIE_STRING);
			} else {
				UserInfoServiceUtil.handleException("Incorrect credentials");
			}

			if (!changePasswordReq.getCurrentPassword().equals(authPassword)) {
				UserInfoServiceUtil.handleException("Current password is incorrect");
			}

			if (tenantDomain != null && !MultitenantConstants.SUPER_TENANT_DOMAIN_NAME.equals(tenantDomain)) {
				isTenantFlowStarted = true;
				PrivilegedCarbonContext.startTenantFlow();
				PrivilegedCarbonContext.getThreadLocalCarbonContext().setTenantDomain(tenantDomain, true);
			}

			UserRegistrationConfigDTO signupConfig = SelfSignUpUtil.getSignupConfiguration(tenantDomain);
			if (signupConfig != null && !"".equals(signupConfig.getSignUpDomain()) && !signupConfig.isSignUpEnabled()) {
				UserInfoServiceUtil.handleException("Self sign up has been disabled for this tenant domain");
			}

			UserIdentityManagementAdminServiceStub identityMgtAdminStub  = new UserIdentityManagementAdminServiceStub(
					null, serverURL + "UserIdentityManagementAdminService"
					);
			Options identityMgtOptions = identityMgtAdminStub._getServiceClient().getOptions();
			identityMgtOptions.setManageSession(true);
			identityMgtOptions.setProperty(HTTPConstants.COOKIE_STRING, sessionCookie);
			identityMgtAdminStub.changeUserPassword(changePasswordReq.getNewPassword(), changePasswordReq.getCurrentPassword());

			if (!isAbleToLogin(authUsername, changePasswordReq.getNewPassword(), serverURL, tenantDomain)) {
				UserInfoServiceUtil.handleException("Password change failed");
			}

			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(new GenericResponse(false, "SUCCESS"));
			response = Response.status(Response.Status.OK).entity(jsonString).build();


			logger.log(Level.INFO, "Password changed successfully for user : " + authUsername);
		} catch (ApiException | InvalidInputException e) {
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, e.getMessage()));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}
			response = Response.status(Response.Status.OK).entity(jsonString).build();

			logger.log(Level.WARNING, "Error occurred changing password");
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
			logger.log(Level.WARNING, "Internal server error occurred while changing password", e);
		} finally {
			if (isTenantFlowStarted) {
				PrivilegedCarbonContext.endTenantFlow();
			}
		}
		return response;
	}

	@POST
	@Path("/change-password")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response changePassword(String jsonBody) {
		Response response=null;
		boolean isTenantFlowStarted = false;
		Gson gson = new GsonBuilder().serializeNulls().create();

		ChangePasswordRequest changePasswordReq = gson.fromJson(jsonBody, ChangePasswordRequest.class);

		try {
			InputValidator.validateUserInput("Username", changePasswordReq.getUsername(), InputType.NAME);
			InputValidator.validateUserInput("Current Password", changePasswordReq.getCurrentPassword());
			InputValidator.validateUserInput("New Password", changePasswordReq.getNewPassword(), InputType.PASSWORD);

			APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();
			String serverURL = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
			String tenantDomain = MultitenantUtils.getTenantDomain(APIUtil.replaceEmailDomainBack(changePasswordReq.getUsername()));

			if (!isAbleToLogin(changePasswordReq.getUsername(), changePasswordReq.getCurrentPassword(), serverURL, tenantDomain)) {
				UserInfoServiceUtil.handleException("Current password is incorrect");
			}

			if (tenantDomain != null && !MultitenantConstants.SUPER_TENANT_DOMAIN_NAME.equals(tenantDomain)) {
				isTenantFlowStarted = true;
				PrivilegedCarbonContext.startTenantFlow();
				PrivilegedCarbonContext.getThreadLocalCarbonContext().setTenantDomain(tenantDomain, true);
			}

			UserRegistrationConfigDTO signupConfig = SelfSignUpUtil.getSignupConfiguration(tenantDomain);
			if (signupConfig != null && !"".equals(signupConfig.getSignUpDomain()) && !signupConfig.isSignUpEnabled()) {
				UserInfoServiceUtil.handleException("Self sign up has been disabled for this tenant domain");
			}

			if(changePasswordReq.getUsername().equals(signupConfig.getAdminUserName())) {
				UserInfoServiceUtil.handleException("Unable to change super admin credentials");
			}

			UserAdminStub userAdminStub = new UserAdminStub(null, serverURL + "UserAdmin");
			String tenantAwareUserName = getTenantAwareUserName(changePasswordReq.getUsername());
			userAdminStub.changePasswordByUser(tenantAwareUserName, changePasswordReq.getCurrentPassword(), changePasswordReq.getNewPassword());

			if (!isAbleToLogin(changePasswordReq.getUsername(), changePasswordReq.getNewPassword(), serverURL, tenantDomain)) {
				UserInfoServiceUtil.handleException("Password change failed");
			}
			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString = mapper.writeValueAsString(new GenericResponse(false, "SUCCESS"));
			response = Response.status(Response.Status.OK).entity(jsonString).build();



			logger.log(Level.INFO, "Password changed successfully for user : " + changePasswordReq.getUsername());
		} catch (ApiException | InvalidInputException e) {

			ObjectMapper mapper = new ObjectMapper();
			//Converting the Object to JSONString
			String jsonString=null;
			try {
				jsonString = mapper.writeValueAsString(new GenericResponse(true, e.getMessage()));
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				response = Response.status(Response.Status.OK).entity("{'ststus':'fail'}").build();

			}
			response = Response.status(Response.Status.OK).entity(jsonString).build();


			logger.log(Level.WARNING, "Error occurred while changing password");
		} catch (Exception e) {

			
		} finally {
			if (isTenantFlowStarted) {
				PrivilegedCarbonContext.endTenantFlow();
			}
		}
		return response;
	}
	
	private void addUser(String username, String password, String fields) throws Exception {

		APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();

		String serverURL = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
		String tenantDomain = MultitenantUtils.getTenantDomain(APIUtil.replaceEmailDomainBack(username));

		/* fieldValues will contain values up to last field user entered */
		String[] fieldValues = fields.split("\\|");
		UserFieldDTO[] userFields = getOrderedUserFieldDTO();
		for (int i = 0; i < fieldValues.length; i++) {
			if (fieldValues[i] != null) {
				userFields[i].setFieldValue(fieldValues[i]);
			}
		}
		/* assign empty string for rest of the user fields */
		for (int i = fieldValues.length; i < userFields.length; i++) {
			userFields[i].setFieldValue("");
		}

		boolean isTenantFlowStarted = false;
		try {
			if (tenantDomain != null && !MultitenantConstants.SUPER_TENANT_DOMAIN_NAME.equals(tenantDomain)) {
				isTenantFlowStarted = true;
				PrivilegedCarbonContext.startTenantFlow();
				PrivilegedCarbonContext.getThreadLocalCarbonContext().setTenantDomain(tenantDomain, true);
			}
			// get the signup configuration
			UserRegistrationConfigDTO signupConfig = SelfSignUpUtil.getSignupConfiguration(tenantDomain);
			// set tenant specific sign up user storage
			if (signupConfig != null && !signupConfig.getSignUpDomain().isEmpty()) {
				if (!signupConfig.isSignUpEnabled()) {
					UserInfoServiceUtil.handleException("Self sign up has been disabled for this tenant domain");
				}
				int index = username.indexOf(UserCoreConstants.DOMAIN_SEPARATOR);

				// if there is a different domain provided by the user other than one given in the configuration,
				// add the correct signup domain. Here signup domain refers to the user storage
				if (index > 0) {
					username = signupConfig.getSignUpDomain().toUpperCase()
							+ UserCoreConstants.DOMAIN_SEPARATOR + username.substring(index + 1);
				} else {
					username = signupConfig.getSignUpDomain().toUpperCase()
							+ UserCoreConstants.DOMAIN_SEPARATOR + username;
				}
			}

			// check whether admin credentials are correct.
			boolean validCredentials = checkCredentialsForAuthServer(signupConfig.getAdminUserName(),
					signupConfig.getAdminPassword(), serverURL);
			if (validCredentials) {
				UserDTO userDTO = new UserDTO();
				userDTO.setUserFields(userFields);
				userDTO.setUserName(username);
				userDTO.setPassword(password);

				UserRegistrationAdminServiceStub stub = new UserRegistrationAdminServiceStub(null, serverURL +
						"UserRegistrationAdminService");
				ServiceClient client = stub._getServiceClient();
				Options option = client.getOptions();
				option.setManageSession(true);

				stub.addUser(userDTO);

				WorkflowExecutor userSignUpWFExecutor = WorkflowExecutorFactory.getInstance()
						.getWorkflowExecutor(WorkflowConstants.WF_TYPE_AM_USER_SIGNUP);

				WorkflowDTO signUpWFDto = new WorkflowDTO();
				signUpWFDto.setWorkflowReference(username);
				signUpWFDto.setStatus(WorkflowStatus.CREATED);
				signUpWFDto.setCreatedTime(System.currentTimeMillis());
				signUpWFDto.setTenantDomain(tenantDomain);

				try {
					int tenantId = ServiceReferenceHolder.getInstance().getRealmService().getTenantManager()
							.getTenantId(tenantDomain);
					signUpWFDto.setTenantId(tenantId);
				} catch (org.wso2.carbon.user.api.UserStoreException e) {
					logger.log(Level.WARNING,"Error while loading Tenant ID for given tenant domain :" + tenantDomain, e);
				}

				signUpWFDto.setExternalWorkflowReference(userSignUpWFExecutor.generateUUID());
				signUpWFDto.setWorkflowType(WorkflowConstants.WF_TYPE_AM_USER_SIGNUP);
				signUpWFDto.setCallbackUrl(userSignUpWFExecutor.getCallbackURL());

				try {
					userSignUpWFExecutor.execute(signUpWFDto);
				} catch (WorkflowException e) {
					logger.log(Level.WARNING,"Unable to execute User SignUp Workflow", e);
					removeTenantUser(username, serverURL);
					UserInfoServiceUtil.handleException("Unable to execute User SignUp Workflow", e);
				}
			} else {
				String customErrorMsg = "Unable to add a user. Please check credentials in "
						+ "the signup-config.xml in the registry";
				UserInfoServiceUtil.handleException(customErrorMsg);
			}
		} catch (UserRegistrationAdminServiceException | WorkflowException |
				UserAdminUserAdminException | RemoteException | APIManagementException e) {
			throw new Exception("Error while adding the user: " + username + ". " + e.getMessage(), e);
		} finally {
			if (isTenantFlowStarted) {
				PrivilegedCarbonContext.endTenantFlow();
			}
		}
	}

	private static void removeTenantUser(String username, String serverURL)
			throws RemoteException, UserAdminUserAdminException {
		UserAdminStub userAdminStub = new UserAdminStub(null, serverURL + "UserAdmin");
		String tenantAwareUserName = getTenantAwareUserName(username);
		userAdminStub.deleteUser(tenantAwareUserName);
	}

	private static String getTenantAwareUserName(String username) {
		String tenantAwareUserName = MultitenantUtils.getTenantAwareUsername(username);
		int index = tenantAwareUserName.indexOf(UserCoreConstants.DOMAIN_SEPARATOR);
		//remove the 'PRIMARY' part from the user name
		if (index > 0 && tenantAwareUserName.substring(0, index)
				.equalsIgnoreCase(UserCoreConstants.PRIMARY_DEFAULT_DOMAIN_NAME)){
			tenantAwareUserName = tenantAwareUserName.substring(index + 1);
		}
		return tenantAwareUserName;
	}

	private static UserFieldDTO[] getOrderedUserFieldDTO() {
		UserRegistrationAdminServiceStub stub;
		UserFieldDTO[] userFields = null;
		try {
			APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();
			String url = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
			if (url == null) {
				UserInfoServiceUtil.handleException("API key manager URL unspecified");
			}
			stub = new UserRegistrationAdminServiceStub(null, url + "UserRegistrationAdminService");
			ServiceClient client = stub._getServiceClient();
			Options option = client.getOptions();
			option.setManageSession(true);
			userFields = stub.readUserFieldsForUserRegistration(UserCoreConstants.DEFAULT_CARBON_DIALECT);
			Arrays.sort(userFields, new HostObjectUtils.RequiredUserFieldComparator());
			Arrays.sort(userFields, new HostObjectUtils.UserFieldComparator());
		} catch (Exception e) {
			logger.log(Level.WARNING, "Error while retrieving User registration Fields", e);
		}
		return userFields;
	}

	private static boolean checkCredentialsForAuthServer(String userName, String password, String serverURL) {

		boolean status;
		try {
			UserAdminStub userAdminStub = new UserAdminStub(null, serverURL + "UserAdmin");
			CarbonUtils.setBasicAccessSecurityHeaders(userName, password, true,
					userAdminStub._getServiceClient());
			//send a request. if exception occurs, then the credentials are not correct.
			userAdminStub.getRolesOfCurrentUser();
			status = true;
		} catch (RemoteException e) {
			logger.log(Level.WARNING, e.getMessage(), e);
			status = false;
		} catch (UserAdminUserAdminException e) {
			logger.log(Level.WARNING, "Error in checking admin credentials. Please check credentials in "
					+ "the signup-config.xml in the registry. ", e);
			status = false;
		}
		return status;
	}

	private static boolean isUserExists(String username) throws ApiException, APIManagementException {
		String tenantDomain = MultitenantUtils.getTenantDomain(APIUtil.replaceEmailDomainBack(username));
		UserRegistrationConfigDTO signupConfig = SelfSignUpUtil.getSignupConfiguration(tenantDomain);
		//add user storage info
		username = SelfSignUpUtil.getDomainSpecificUserName(username, signupConfig );
		String tenantAwareUserName = MultitenantUtils.getTenantAwareUsername(username);
		boolean exists = false;
		try {
			RealmService realmService = ServiceReferenceHolder.getInstance().getRealmService();
			int tenantId = ServiceReferenceHolder.getInstance().getRealmService().getTenantManager()
					.getTenantId(tenantDomain);
			UserRealm realm = (UserRealm) realmService.getTenantUserRealm(tenantId);
			UserStoreManager manager = realm.getUserStoreManager();
			if (manager.isExistingUser(tenantAwareUserName)) {
				exists = true;
			}
		} catch (org.wso2.carbon.user.api.UserStoreException e) {
			UserInfoServiceUtil.handleException("Error while checking user existence for " + username, e);
		}
		return exists;
	}

	private static boolean isAbleToLogin(String username, String password, String serverURL,
			String tenantDomain) throws ApiException {
		boolean loginStatus = false;
		if (serverURL == null) {
			UserInfoServiceUtil.handleException("API key manager URL unspecified");
		}
		try {
			AuthenticationAdminStub authAdminStub =
					new AuthenticationAdminStub(null, serverURL + "AuthenticationAdmin");
			//update permission cache before validate user
			int tenantId = ServiceReferenceHolder.getInstance().getRealmService().getTenantManager()
					.getTenantId(tenantDomain);
			PermissionUpdateUtil.updatePermissionTree(tenantId);
			String host = new URL(serverURL).getHost();
			if (authAdminStub.login(username, password, host)) {
				loginStatus = true;
			}
		} catch (MalformedURLException | org.wso2.carbon.user.api.UserStoreException | RemoteException |
				LoginAuthenticationExceptionException axisFault) {
			logger.log(Level.WARNING,"Error while checking the ability to login", axisFault);
		}
		return loginStatus;
	}

	private static void handleException(String msg) throws ApiException {
		logger.log(Level.WARNING, msg);
		throw new ApiException(msg);
	}

	private static void handleException(String msg, Throwable throwable) throws ApiException {
		logger.log(Level.WARNING, msg);
		throw new ApiException(msg, throwable);
	}

	private enum AllFieldValue {
		FIRST_NAME(0),
		LAST_NAME(1),
		ORGANIZATION(2),
		COUNTRY(3),
		EMAIL(4),
		LAND_PHONE(5),
		MOBILE_PHONE(6),
		IM(7),
		URL(8);

		private final int position;

		AllFieldValue(int position) {
			this.position = position;
		}

		public int getPosition() {
			return position;
		}
	}
}
