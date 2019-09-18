import { ForumState, TopicDetail } from "./forum.data.models";
import * as forumActions from "./forum.actions";
import { createReducer, on } from '@ngrx/store';

const initState: ForumState = {
  allTopics: null,
  topicDetail:null
};

const _forumReducer = createReducer(initState,

  on(forumActions.GetAllTopicsSuccessAction, (state, { payload }) => ({
      ...state, allTopics: payload
  })),

  // on(forumActions.SetSelectedTopicAction, (state, { payload }) => ({
  //   ...state, selectedTopic: payload
  // })),

  on(forumActions.GetTopicDetailSuccessAction, (state, { payload }) => ({
    ...state, topicDetail: payload
  }))
)

export function forumReducer(state, action) {
  return _forumReducer(state, action);
}