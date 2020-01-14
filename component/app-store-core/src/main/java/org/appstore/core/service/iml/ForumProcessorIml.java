package org.appstore.core.service.iml;

import java.util.List;

import org.appstore.core.dao.ForumDataProvider;
import org.appstore.core.dto.GenaricTopicList;
import org.appstore.core.dto.GenericResponseWithIDs;
import org.appstore.core.dto.Reply;
import org.appstore.core.dto.Topic;
import org.appstore.core.service.ForumProcessor;

import com.wso2telco.core.dbutils.exception.BusinessException;
import com.wso2telco.core.dbutils.util.Callback;

public class ForumProcessorIml implements ForumProcessor {

	@Override
	public Callback getTopicList(int start,int count) throws BusinessException {
		// TODO Auto-generated method stub
		ForumDataProvider dataProvider=new ForumDataProvider();
		GenaricTopicList  genaricTopicList=new GenaricTopicList();
		List<Topic> topics=dataProvider.getTopics(start, count);
		genaricTopicList.setList(topics);

		genaricTopicList.setTotalTopics(topics.size());
		genaricTopicList.setNextPage(start+count);
		return new Callback().setMessage("success").setPayload(genaricTopicList).setSuccess(true);
	}

	@Override
	public Callback getTopic(int topicID) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		Topic topic=dataProvider.getTopic(topicID);

		return new Callback().setMessage("success").setPayload(topic).setSuccess(true);
	}

	@Override
	public Callback addTopic(Topic topic) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		
		Topic topicInDB=dataProvider.addTopic(topic);
		
		GenericResponseWithIDs gr=new GenericResponseWithIDs();
		gr.setId(topicInDB.getId());
		gr.setIdType("Topic ID");
		gr.setMessage("Topic created successfully");
		
		return new Callback().setMessage("success").setPayload(gr).setSuccess(true);
	}

	@Override
	public Callback deleteTopic(Topic topic) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		Topic topicInDB=dataProvider.deleteTopic(topic);
		GenericResponseWithIDs gr=new GenericResponseWithIDs();

		gr.setId(topicInDB.getId());
		gr.setIdType("Topic ID");
		gr.setMessage("Topic deleted successfully");
		return new Callback().setMessage("success").setPayload(gr).setSuccess(true);
	}

	@Override
	public Callback addReply(Reply reply) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		Reply replyInDB=dataProvider.addReply(reply);
		GenericResponseWithIDs gr=new GenericResponseWithIDs();
		gr.setId(replyInDB.getReplyId());
		gr.setIdType("Reply ID");
		gr.setMessage("Reply added successfully");
		return new Callback().setMessage("success").setPayload(gr).setSuccess(true);
	}

	@Override
	public Callback deleteReply(Reply reply) throws BusinessException {
		ForumDataProvider dataProvider=new ForumDataProvider();
		Reply replyInDB=dataProvider.deleteReply(reply);
		GenericResponseWithIDs gr=new GenericResponseWithIDs();
		gr.setId(replyInDB.getReplyId());
		gr.setIdType("Reply ID");
		gr.setMessage("Reply deleted successfully");
		return new Callback().setMessage("success").setPayload(gr).setSuccess(true);
	}

}
