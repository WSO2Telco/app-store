import { EntityState } from '@ngrx/entity';

export interface ForumState extends EntityState<Topic> {
  ids: [],
  entities : {},
  totalTopics : 0,
  loading : false,
  loaded : false
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
  page: number = 0;
  size: number = 10;
  search?: string;
}

export class CreateTopicParam {
  title: string;
  content: string;
}

export class PostCommentParam {
  topicID : string;
  replyText : string;
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
