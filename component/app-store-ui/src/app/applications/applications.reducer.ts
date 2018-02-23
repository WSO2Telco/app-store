import { ApplicationsState } from './applications.data.models';
import * as applicationsActions from './applications.actions';

const initialState: ApplicationsState = {
  allApplications: null
};

export function applicationsReducer(
  state: ApplicationsState = initialState,
  action: applicationsActions.Actions
) {
  switch (action.type) {
    case applicationsActions.GET_ALL_APPLICATIONS_SUCCESS: {
      return Object.assign({}, state, { allApplications: action.payload });
    }

    default: return state;
  }
}
