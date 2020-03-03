import { ForumState, Topic } from "./forum.data.models";
import * as forumActions from "./forum.actions";
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const forumAdapter: EntityAdapter<Topic> = createEntityAdapter<Topic>();

export const defaultForum: ForumState = {
  ids: [],
  entities: {},
  totalTopics: 0,
  loading: false,
  loaded: false
}

const initState = forumAdapter.getInitialState(defaultForum);

const _forumReducer = createReducer(initState,

  on(forumActions.GetAllTopicsSuccessAction, (state, { payload }) => {
    console.log(payload);
    return forumAdapter.addAll(payload.list, {
      ...state,
      entities : {},
      loaded: true,
      loading: false,
      totalTopics: payload.totalTopics
    })
  }),

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