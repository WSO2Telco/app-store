package org.appstore.core.service;

import com.wso2telco.core.dbutils.exception.BusinessException;
import com.wso2telco.core.dbutils.util.Callback;
import com.wso2telco.core.userprofile.dto.UserProfileDTO;

public interface AppStoreProcessor {
    public Callback getApis(final UserProfileDTO userProfile) throws BusinessException;
}
