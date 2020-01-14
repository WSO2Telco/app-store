package org.appstore.core.service;

import org.appstore.core.dto.GenericResponseWithIDs;
import org.appstore.core.dto.Reply;
import org.appstore.core.dto.Topic;

import com.wso2telco.core.dbutils.exception.BusinessException;
import com.wso2telco.core.dbutils.util.Callback;
import com.wso2telco.core.userprofile.dto.UserProfileDTO;

public interface ForumProcessor {
	public Callback getTopicList(int start,int count) throws BusinessException;
	public Callback getTopic(int topicID) throws BusinessException;
	public Callback addTopic(Topic topic) throws BusinessException;
	public Callback deleteTopic(Topic topic) throws BusinessException;
	public Callback addReply(Reply reply) throws BusinessException;
	public Callback deleteReply(Reply reply) throws BusinessException;
}
