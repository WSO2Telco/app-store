export interface ForumState {
  allTopics: Topic[];
  selectedTopic: Topic;
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
  search?:string;
}
