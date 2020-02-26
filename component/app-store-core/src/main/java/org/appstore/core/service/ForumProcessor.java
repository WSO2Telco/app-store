package org.appstore.core.service;

import org.appstore.core.dto.Callback;
import org.appstore.core.dto.GenericResponseWithIDs;
import org.appstore.core.dto.Reply;
import org.appstore.core.dto.Topic;

import com.wso2telco.core.dbutils.exception.BusinessException;
import com.wso2telco.core.userprofile.dto.UserProfileDTO;

public interface ForumProcessor {
	public Callback getTopicList(int start,int count,String user,boolean isAdmin) throws BusinessException;
	public Callback getTopic(int topicID,String user,boolean isAdmin) throws BusinessException;
	public Callback addTopic(Topic topic,String user,boolean isAdmin) throws BusinessException;
	public Callback deleteTopic(Topic topic,String user,boolean isAdmin) throws BusinessException;
	public Callback addReply(Reply reply,String user,boolean isAdmin) throws BusinessException;
	public Callback deleteReply(Reply reply,String user,boolean isAdmin) throws BusinessException;
	public Callback getTopicList(String keyword,String user,boolean isAdmin) throws BusinessException;
}
