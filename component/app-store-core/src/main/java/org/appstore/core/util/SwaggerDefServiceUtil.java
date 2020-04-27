package org.appstore.core.util;

import org.apache.commons.lang3.StringUtils;
import org.wso2.carbon.apimgt.hostobjects.internal.ServiceReferenceHolder;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;
import org.wso2.carbon.governance.registry.extensions.internal.GovernanceRegistryExtensionsDataHolder;
import org.wso2.carbon.registry.core.Registry;
import org.wso2.carbon.registry.core.Resource;
import org.wso2.carbon.registry.core.ResourceImpl;
import org.wso2.carbon.registry.core.exceptions.RegistryException;
import org.wso2.carbon.registry.core.session.UserRegistry;
import org.wso2.carbon.utils.multitenancy.MultitenantUtils;

public class SwaggerDefServiceUtil {

    public String getSwaggerData(String apiNameVal, String apiVersionVal, String providerVal, int tenantID, String userName) throws RegistryException {
        String url = "/apimgt/applicationdata/provider/" + providerVal + "/" + apiNameVal + "/" + apiVersionVal + "/" + "swagger.json";
        ResourceImpl resourceImpl = null;
        String tenantAwareUsername = null;

        if (userName != null) {
            tenantAwareUsername = MultitenantUtils.getTenantAwareUsername(userName);
        } else {
            tenantAwareUsername = "wso2.anonymous.user";
        }

        UserRegistry userRegistry = GovernanceRegistryExtensionsDataHolder.getInstance().getRegistryService().getGovernanceUserRegistry(tenantAwareUsername, tenantID);
        resourceImpl = (ResourceImpl) userRegistry.get(url);

        return getJsonFileFromRegistry(resourceImpl.getPath());
    }


    String getJsonFileFromRegistry(String JsonPathRegistry) throws RegistryException {

        String SwaggerContent = null;

        //get swaggerjson from registry
        Registry registry = GovernanceRegistryExtensionsDataHolder.getInstance().getRegistryService().getGovernanceSystemRegistry();
        Resource resource = registry
                .get(JsonPathRegistry);
        SwaggerContent = new String((byte[]) resource.getContent());


        //getting basepath
        String apipath = JsonPathRegistry.replace("swagger.json", "api");
        Resource resource2 = registry
                .get(apipath);
        String apiContentString = new String((byte[]) resource2.getContent());
        String basepathVal = StringUtils.substringBetween(apiContentString, "<context>", "</context>");


        //get value for security Definitions
        APIManagerConfiguration apiManagerConfiguration = ServiceReferenceHolder.getInstance().getAPIManagerConfigurationService().getAPIManagerConfiguration();
//        String SecurityAuthUrl = apiManagerConfiguration.getProperty("OAuthConfigurations.RevokeAPIURL").get(0).replace("revoke", "authorize");
        String SecurityAuthUrl = StringUtils.substringAfterLast(apiManagerConfiguration.getProperty("APIGateway.Environments.Environment.GatewayEndpoint").get(0), ",").concat("/authorize");
        String secAuthType = (apiManagerConfiguration.getProperty("OAuthConfigurations.TokenEndPointName").get(0).contains("auth2")) ? "oauth2" : "";
//        String hostUrl = apiManagerConfiguration.getProperty("OAuthConfigurations.RevokeAPIURL").get(0).replace("revoke", "").replace("https://","").replace("/","");
        String hostUrl = StringUtils.substringAfterLast(apiManagerConfiguration.getProperty("APIGateway.Environments.Environment.GatewayEndpoint").get(0), ",").replace("https://","");


        String SecurrityDef = "\"securityDefinitions\":{ \"default\":{ \"type\": \"" + secAuthType + "\",\"authorizationUrl\": \"" + SecurityAuthUrl + "\", \"flow\": \"implicit\", \"scopes\":{} }}";
        String host = "\"host\" : \"" + hostUrl + "\"";
        String basepath = "\"basePath\" : \"" + basepathVal + "\"";
        String schemas = "\"schemes\" : [\"https\",\"http\"]";
        String bracketremvestring = SwaggerContent.substring(0, SwaggerContent.length() - 1);
        String SwaggerObjectString = bracketremvestring.concat("," + host).concat("," + basepath).concat("," + schemas).concat("," + SecurrityDef).concat("}");

        return SwaggerObjectString;

    }


}


