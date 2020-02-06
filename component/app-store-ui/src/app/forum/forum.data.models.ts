export interface ForumState {
  allTopics: TopicResultPayload;
  topicDetail:Topic;
}

export class Topic {
  id: number;
  title: string;
  author: string;
  date: string;
  replies: [];
  replyCount: number;
  content: string;
}

export class TopicResult {
  payload: TopicResultPayload;
  success: boolean;
  message: string;
}

export class TopicResultPayload {
  totalTopics: number;
  nextPage: number;
  list: Topic[]
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
