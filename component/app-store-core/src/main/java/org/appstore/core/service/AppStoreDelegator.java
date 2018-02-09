package org.appstore.core.service;

import com.wso2telco.core.dbutils.exception.BusinessException;
import com.wso2telco.core.dbutils.util.Callback;
import com.wso2telco.core.userprofile.dto.UserProfileDTO;


public class AppStoreDelegator {

    public Callback getApis(UserProfileDTO userProfile) throws BusinessException {
        AppStoreProcessor queryBuilder = ActivityProcessFactory
                .getInstance()
                .getAppStoreFactory();

        return queryBuilder.getApis(userProfile);
    }

}
