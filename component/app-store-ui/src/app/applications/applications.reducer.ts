import { ApplicationsState, Application, ApplicationDetails } from './applications.data.models';
import * as applicationsActions from './applications.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: ApplicationsState = {
  allApplications: null,
  selectedApplication: new ApplicationDetails,
  appSubscriptions: null
};


const _applicationsReducer = createReducer(initialState,

  on(applicationsActions.GetAllApplicationsSuccessAction , (state, { payload }) => ({
      ...state, allApplications: payload
  })),

  on(applicationsActions.SetSelectedApplicationsAction, (state, { payload }) => ({
    ...state, selectedApplication: payload
  })),

  on(applicationsActions.GetApplicationDetailsSuccessAction, (state, { payload }) => ({
    ...state, selectedApplication: payload
  })),

  on(applicationsActions.GetApplicationSubscriptionsSuccessAction, (state, { payload }) => ({
      ...state, appSubscriptions: payload
  }))
);

export function applicationsReducer(state, action) {
  return _applicationsReducer(state, action);
}