import { ApplicationState, Application } from './applications.data.models';
import * as applicationsActions from './applications.actions';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromRoot from '../app.data.models';

export const appListAdapter: EntityAdapter<Application> = createEntityAdapter<Application>({
  selectId: app => app.applicationId
});

const defaultAppState: ApplicationState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  next: "",
  previous: ""
};

export interface AppState extends fromRoot.AppState {
  apps: ApplicationState
}

const initState = appListAdapter.getInitialState(defaultAppState);

const _applicationsReducer = createReducer(initState,

  on(applicationsActions.GetAllApplicationsSuccessAction, (state, { payload }) => {
    return appListAdapter.addAll(payload.list, {
      ...state,
      entities: {},
      loaded: true,
      loading: false,
      previous: payload.previous,
      next: payload.next,
    })
  })

);

export function applicationsReducer(state, action) {
  return _applicationsReducer(state, action);
}

/*
  App Selectors
*/

const getAppFeatureState = createFeatureSelector<ApplicationState>("apps");

export const getApps = createSelector(getAppFeatureState, appListAdapter.getSelectors().selectAll);
export const getApp = (id: string) => createSelector(getAppFeatureState, state => state.entities[id]);