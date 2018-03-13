export interface ForumState {
  allTopics: Topic[];
  selectedTopic: Topic;
  topicDetail:TopicDetail;
}

export class Topic {
  description: string;
  replyCount: number;
  subject: string;
  topicId: string;
  topicOwner: string;
  user: string;
}

export class TopicResult {
  data: Topic[];
  error: boolean;
  page: number;
  total_pages: number;
}

export class GetTopicsParam {
  parentId: string;
  page: number;
  search?: string;
}

export class CreateTopicParam {
  subject: string;
  parentId: string;
  description: string;
}

export class Reply {
  createdBy: string;
  date: string;
  reply: string;
  replyId: string;
  time: string;
  timeStamp: string;
  topicOwner: string;
  user: string;
}

export class TopicDetail {
  topic: Topic;
  replies: Reply[];
}
