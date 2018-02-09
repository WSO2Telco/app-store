package org.appstore.core.service;

import org.appstore.core.util.DeploymentTypes;
import org.appstore.core.util.WorkFlowHealper;

public class ActivityProcessFactory {
	private ActivityProcessFactory() {
	}

	private static  ActivityProcessFactory instance;

	public static synchronized ActivityProcessFactory getInstance() {
		if (instance == null) {
			instance = new ActivityProcessFactory();
		}
		return instance;

	}
	
	public  AppStoreProcessor getAppStoreFactory() {
		DeploymentTypes depType =DeploymentTypes.getByName( WorkFlowHealper.getDeploymentType());
		AppStoreProcessor queryBuilder=null;
		switch (depType) {
			case EXTERNAL_GATEWAY:
				queryBuilder =  ExtGtwRequestBuilder.getInstace(depType);
				break;
			case HUB:
				queryBuilder =  HubRequestBuilder.getInstace(depType);
				break;
			case INTERNAL_GATEWAY:
				queryBuilder =  IntGtwRequestBuilder.getInstace(depType);
				break;
			default:
				queryBuilder =  HubRequestBuilder.getInstace(depType);
				break;

		}
		return queryBuilder;
	} 
}
