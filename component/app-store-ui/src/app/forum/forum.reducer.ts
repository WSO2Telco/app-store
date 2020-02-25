import { ForumState, Topic, TopicDetail, TopicResultPayload } from "./forum.data.models";
import * as forumActions from "./forum.actions";
import { createReducer, on } from '@ngrx/store';

const initState: ForumState = {
  allTopics: new TopicResultPayload,
  topicDetail: new Topic
};

const _forumReducer = createReducer(initState,

  on(forumActions.GetAllTopicsSuccessAction, (state, { payload }) => ({
      ...state, allTopics: payload
  })),

  on(forumActions.SearchTopicsSuccessAction, (state, { payload }) => ({
    ...state, allTopics: payload
  })),

  on(forumActions.GetTopicDetailSuccessAction, (state, { payload }) => ({
    ...state, topicDetail: payload
  }))
)

export function forumReducer(state, action) {
  return _forumReducer(state, action);
}