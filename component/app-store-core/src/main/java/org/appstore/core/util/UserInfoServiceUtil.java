package org.appstore.core.util;

import org.apache.axis2.AxisFault;
import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;
import org.apache.axis2.transport.http.HTTPConstants;
import org.appstore.core.exception.ApiException;
import org.wso2.carbon.apimgt.impl.APIConstants;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;
import org.wso2.carbon.apimgt.impl.utils.APIUtil;
import org.wso2.carbon.authenticator.stub.AuthenticationAdminStub;
import org.wso2.carbon.captcha.mgt.beans.xsd.CaptchaInfoBean;
import org.wso2.carbon.core.util.PermissionUpdateUtil;
import org.wso2.carbon.identity.mgt.stub.UserInformationRecoveryServiceIdentityMgtServiceExceptionException;
import org.wso2.carbon.identity.mgt.stub.UserInformationRecoveryServiceStub;
import org.wso2.carbon.apimgt.hostobjects.internal.HostObjectComponent;
import org.wso2.carbon.apimgt.hostobjects.internal.ServiceReferenceHolder;
import org.wso2.carbon.identity.mgt.stub.beans.VerificationBean;
import org.wso2.carbon.um.ws.api.stub.RemoteUserStoreManagerServiceStub;
import org.wso2.carbon.utils.multitenancy.MultitenantUtils;

import java.net.URL;
import java.rmi.RemoteException;
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

public class UserInfoServiceUtil {

    private static final Logger logger = Logger.getLogger(UserInfoServiceUtil.class.getName());

    private UserInformationRecoveryServiceStub stub = null;
    private static UserInfoServiceUtil userInfoServiceUtil = null;

    private String userInfoRecoveryService = "UserInformationRecoveryService";

    private UserInfoServiceUtil() {
        initUserInfoRecoveryService();
    }

    private void initUserInfoRecoveryService () {
        try {
            APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();
            String url = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
            if (url == null) {
                handleException("API_KEY_MANAGER URL Unspecified");
            }
            stub = new UserInformationRecoveryServiceStub(null, url + userInfoRecoveryService);
        } catch (ApiException e) {
            logger.log(Level.WARNING, "product data retrieval error " + e);
        } catch (AxisFault axisFault) {
            logger.log(Level.WARNING, "Stub generation error occurred " + axisFault);
        }
    }

    public static UserInfoServiceUtil getInstance() {
        if(userInfoServiceUtil == null) {
            userInfoServiceUtil = new UserInfoServiceUtil();
        }
        return userInfoServiceUtil;
    }

    public void getUserInfoService(String sessionCookie) {
        ServiceClient serviceClient = stub._getServiceClient();
        Options options = serviceClient.getOptions();
        options.setManageSession(true);
        options.setProperty(HTTPConstants.COOKIE_STRING, sessionCookie);
    }

    public VerificationBean sendNotification(String username) throws RemoteException, UserInformationRecoveryServiceIdentityMgtServiceExceptionException {
        CaptchaInfoBean captchaInfoBean = stub.getCaptcha();
        VerificationBean userBean = stub.verifyUser(username, captchaInfoBean);
        return stub.sendRecoveryNotification(username, userBean.getKey(), "email");
    }

    public VerificationBean updatePassword(String username, String confirmationCode, /*CaptchaInfoBean captchaInfoBean,*/ String newPassword) throws RemoteException, UserInformationRecoveryServiceIdentityMgtServiceExceptionException {
        CaptchaInfoBean captchaInfoBean = stub.getCaptcha();
        VerificationBean verificationBean = stub.verifyConfirmationCode(username, confirmationCode, captchaInfoBean);
        return stub.updatePassword(username, verificationBean.getKey(), newPassword);
    }

    public static String getSessionCookie () {
        String authenticationServiceName = "AuthenticationAdmin";
        AuthenticationAdminStub authenticationAdminStub;
        String sessionCookie = null;

        try {
            APIManagerConfiguration apiManagerConfiguration = HostObjectComponent.getAPIManagerConfiguration();
            String serverURL = apiManagerConfiguration.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
            String adminUsername = apiManagerConfiguration.getFirstProperty(APIConstants.AUTH_MANAGER_USERNAME);
            String adminPassword = apiManagerConfiguration.getFirstProperty(APIConstants.AUTH_MANAGER_PASSWORD);
            String tenantDomain = MultitenantUtils.getTenantDomain(APIUtil.replaceEmailDomain(adminUsername));

            if (adminUsername == null || adminPassword == null || serverURL == null) {
                handleException("Required connection details not found");
            }

            authenticationAdminStub = new AuthenticationAdminStub(null, serverURL + authenticationServiceName);
            Options authOptions = authenticationAdminStub._getServiceClient().getOptions();
            authOptions.setManageSession(true);

            int tenantID = ServiceReferenceHolder.getInstance().getRealmService().getTenantManager().getTenantId(tenantDomain);
            if (tenantID == org.wso2.carbon.base.MultitenantConstants.INVALID_TENANT_ID) {
                handleException("Invalid tenant domain");
            }

            PermissionUpdateUtil.updatePermissionTree(tenantID);
            if (authenticationAdminStub.login(adminUsername, adminPassword, new URL(serverURL).getHost())) {
                sessionCookie = (String) authenticationAdminStub._getServiceClient().getLastOperationContext()
                        .getServiceContext().getProperty(HTTPConstants.COOKIE_STRING);
            } else {
                handleException("Incorrect credentials");
            }
        } catch (Exception e) {
            logger.log(Level.WARNING, "Error while retrieving session cookie");
        }
        return sessionCookie;
    }

    public static void handleException(String msg) throws ApiException {
        logger.log(Level.WARNING, msg);
        throw new ApiException(msg);
    }

    public static void handleException(String msg, Throwable throwable) throws ApiException {
        logger.log(Level.WARNING, msg);
        throw new ApiException(msg, throwable);
    }

    public static boolean isEmailExists(String username, String userEmail) {
        boolean emailStatus = false;
        String email = getUserFieldDTO(username, "http://wso2.org/claims/emailaddress");
        if (email != null && userEmail.equals(email)) {
            emailStatus = true;
        }
        return emailStatus;
    }

    public static String getTheme(String username) {
        String theme = getUserFieldDTO(username, "http://wso2.org/claims/usertheme");
        return theme;
    }

    public static boolean setTheme (String username, String claimValue) {
        boolean status = UserInfoServiceUtil.setUserFieldDTO(username,"http://wso2.org/claims/usertheme", claimValue, "default");
        return status;
    }

    private static String getUserFieldDTO(String username, String claim) {

        String userMangeServiceName = "RemoteUserStoreManagerService";
        RemoteUserStoreManagerServiceStub stub;
        String userField = null;

        String sessionCookie = UserInfoServiceUtil.getSessionCookie();

        try {
            APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();
            String url = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
            if (url == null) {
                UserInfoServiceUtil.handleException("API_KEY_MANAGER URL Unspecified");
            }

            stub = new RemoteUserStoreManagerServiceStub(null, url + userMangeServiceName);
            ServiceClient serviceClient = stub._getServiceClient();
            Options options = serviceClient.getOptions();
            options.setManageSession(true);
            options.setProperty(HTTPConstants.COOKIE_STRING, sessionCookie);
            userField = stub.getUserClaimValue(username, claim, "default");
        } catch (Exception e) {
            logger.log(Level.CONFIG, "Error while retrieving user details " + e);
        }
        return userField;
    }

    private static boolean setUserFieldDTO(String username, String claimURI, String claimValue, String userProfile) {
        String userManageServiceName = "RemoteUserStoreManagerService";
        RemoteUserStoreManagerServiceStub stub;
        boolean status = false;

        String sessionCookie = UserInfoServiceUtil.getSessionCookie();

        try {
            APIManagerConfiguration config = HostObjectComponent.getAPIManagerConfiguration();
            String url = config.getFirstProperty(APIConstants.AUTH_MANAGER_URL);
            if (url == null) {
                UserInfoServiceUtil.handleException("API_KEY_MANAGER URL Unspecified");
            }

            stub = new RemoteUserStoreManagerServiceStub(null, url + userManageServiceName);
            ServiceClient serviceClient = stub._getServiceClient();
            Options options = serviceClient.getOptions();
            options.setManageSession(true);
            options.setProperty(HTTPConstants.COOKIE_STRING, sessionCookie);
            stub.setUserClaimValue(username, claimURI, claimValue, userProfile);
            status = true;
        } catch (Exception e) {
            logger.log(Level.CONFIG, "Error while updating user details " + e);
        }
        return status;
    }
}
