package org.appstore.core.dto;

import java.util.List;

public class GenaricTopicList {
	
	 private int totalTopics;
	 private int nextPage;
	 private List<Topic> list;
	
	public int getTotalTopics() {
		return totalTopics;
	}
	public void setTotalTopics(int totalTopics) {
		this.totalTopics = totalTopics;
	}
	public int getNextPage() {
		return nextPage;
	}
	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
	public List<Topic> getList() {
		return list;
	}
	public void setList(List<Topic> list) {
		this.list = list;
	}
	
	 
	 

}
