package org.appstore.core.dto;

import java.sql.Date;

public class Reply {

	private int replyId;

	private String replyText;

	private Date time;

	private String replyUsername;
	
	private int topicID;
	
	



	public int getReplyId() {
		return replyId;
	}

	public void setReplyId(int replyId) {
		this.replyId = replyId;
	}

	public int getTopicID() {
		return topicID;
	}

	public void setTopicID(int topicID) {
		this.topicID = topicID;
	}

	public String getReplyText() {
		return replyText;
	}

	public void setReplyText(String replyText) {
		this.replyText = replyText;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getReplyUsername() {
		return replyUsername;
	}

	public void setReplyUsername(String replyUsername) {
		this.replyUsername = replyUsername;
	}
	
	
	
}
