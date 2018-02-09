package org.appstore.core.service;

import com.wso2telco.core.dbutils.exception.BusinessException;
import com.wso2telco.core.dbutils.util.Callback;
import com.wso2telco.core.userprofile.dto.UserProfileDTO;
import org.apache.commons.logging.Log;
import org.appstore.core.util.DeploymentTypes;

public abstract class DefaultRequestBuilder implements AppStoreProcessor {

    protected Log log;
    protected DeploymentTypes depType;

    public Callback getApis(UserProfileDTO userProfile) throws BusinessException {
        System.out.println("hit in this place");
        return new Callback().setMessage("success").setPayload("").setSuccess(true);
    }
}
