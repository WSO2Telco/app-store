package org.appstore.core.service.iml;

import java.util.List;

import org.appstore.core.dao.ForumDataProvider;
import org.appstore.core.dto.GenaricTopicList;
import org.appstore.core.dto.GenericResponseWithIDs;
import org.appstore.core.dto.Reply;
import org.appstore.core.dto.Topic;
import org.appstore.core.service.ForumProcessor;
import org.appstore.core.dto.Callback ;

import com.wso2telco.core.dbutils.exception.BusinessException;

public class ForumProcessorIml implements ForumProcessor {

	@Override
	public Callback getTopicList(int start,int count,String user,boolean isAdmin) throws BusinessException {
		// TODO Auto-generated method stub
		ForumDataProvider dataProvider=new ForumDataProvider();
		GenaricTopicList  genaricTopicList=new GenaricTopicList();
		List<Topic> topics=dataProvider.getTopics(start, count,user,isAdmin);
		genaricTopicList.setList(topics);
		int totalTopicCount=dataProvider.getTotalTopicsCount();

		genaricTopicList.setTotalTopics(totalTopicCount);
		genaricTopicList.setNextPage(start+count);
		return new Callback().setMessage("success").setPayload(genaricTopicList).setSuccess(true);
	}
	
	@Override
	public Callback getTopicList(String keyword,String user,boolean isAdmin) throws BusinessException {
		// TODO Auto-generated method stub
		ForumDataProvider dataProvider=new ForumDataProvider();
		GenaricTopicList  genaricTopicList=new GenaricTopicList();
		List<Topic> topics=dataProvider.getTopics(keyword,user,isAdmin);
		genaricTopicList.setList(topics);
		int totalTopicCount=dataProvider.getTotalTopicsCount();

		genaricTopicList.setTotalTopics(totalTopicCount);

		return new Callback().setMessage("success").setPayload(genaricTopicList).setSuccess(true);
	}

	@Override
	public Callback getTopic(int topicID,String user,boolean isAdmin) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		Topic topic=dataProvider.getTopic(topicID,user,isAdmin);

		return new Callback().setMessage("success").setPayload(topic).setSuccess(true);
	}

	@Override
	public Callback addTopic(Topic topic,String user,boolean isAdmin) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		
		topic.setAuthor(user);
		
		Topic topicInDB=dataProvider.addTopic(topic);
		
		GenericResponseWithIDs gr=new GenericResponseWithIDs();
		gr.setId(topicInDB.getId());
		gr.setIdType("Topic ID");
		gr.setMessage("Topic created successfully");
		
		return new Callback().setMessage("success").setPayload(gr).setSuccess(true);
	}

	@Override
	public Callback deleteTopic(Topic topic,String user,boolean isAdmin) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		Topic topicInDB=dataProvider.deleteTopic(topic,user,isAdmin);
		GenericResponseWithIDs gr=new GenericResponseWithIDs();

		gr.setId(topicInDB.getId());
		gr.setIdType("Topic ID");
		gr.setMessage("Topic deleted successfully");
		return new Callback().setMessage("success").setPayload(gr).setSuccess(true);
	}

	@Override
	public Callback addReply(Reply reply,String user,boolean isAdmin) throws BusinessException {
		reply.setReplyUsername(user);
		ForumDataProvider dataProvider=new ForumDataProvider();
		Reply replyInDB=dataProvider.addReply(reply);
		GenericResponseWithIDs gr=new GenericResponseWithIDs();
		gr.setId(replyInDB.getReplyId());
		gr.setIdType("Reply ID");
		gr.setMessage("Reply added successfully");
		return new Callback().setMessage("success").setPayload(gr).setSuccess(true);
	}

	@Override
	public Callback deleteReply(Reply reply,String user,boolean isAdmin) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		Reply replyInDB=dataProvider.deleteReply(reply,user,isAdmin);
		GenericResponseWithIDs gr=new GenericResponseWithIDs();
		gr.setId(replyInDB.getReplyId());
		gr.setIdType("Reply ID");
		gr.setMessage("Reply deleted successfully");
		return new Callback().setMessage("success").setPayload(gr).setSuccess(true);
	}

}
