import { ForumState, Topic } from "./forum.data.models";
import * as forumActions from "./forum.actions";
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromRoot from '../app.data.models';

export const forumAdapter: EntityAdapter<Topic> = createEntityAdapter<Topic>();

export const defaultForum: ForumState = {
  ids: [],
  entities: {},
  totalTopics: 0,
  loading: false,
  loaded: false
}

export interface AppState extends fromRoot.AppState {
  forum: ForumState
}

const initState = forumAdapter.getInitialState(defaultForum);

const _forumReducer = createReducer(initState,

  on(forumActions.GetAllTopicsSuccessAction, (state, { payload }) => {
    return forumAdapter.addAll(payload.list, {
      ...state,
      entities: {},
      loaded: true,
      loading: false,
      totalTopics: payload.totalTopics
    })
  }),

  on(forumActions.SearchTopicsSuccessAction, (state, { payload }) => ({
    ...state, allTopics: payload
  })),

  on(forumActions.GetTopicDetailSuccessAction, (state, { payload }) => {
    return forumAdapter.upsertOne(payload, {
      ...state,
    })
  })
)

export function forumReducer(state, action) {
  return _forumReducer(state, action);
}


/*
  Forum Selectors
*/

const getForumFeatureState = createFeatureSelector<ForumState>("forum");

export const getTopics = createSelector(getForumFeatureState, forumAdapter.getSelectors().selectAll);
export const getTopic = (id: string) => createSelector(getForumFeatureState, state => state.entities[id]);