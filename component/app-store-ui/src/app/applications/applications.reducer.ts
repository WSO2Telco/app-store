import { ApplicationsState } from './applications.data.models';
import * as applicationsActions from './applications.actions';

const initialState: ApplicationsState = {
  allApplications: null,
  selectedApplication : null
};

export function applicationsReducer(
  state: ApplicationsState = initialState,
  action: applicationsActions.Actions
) {
  switch (action.type) {
    case applicationsActions.GET_ALL_APPLICATIONS_SUCCESS: {
      return Object.assign({}, state, { allApplications: action.payload });
    }
    
    case applicationsActions.SET_SELECTED_APPLICATION: {
      return Object.assign({}, state, { selectedApplication: action.payload });
    }

    default: return state;
  }
}
