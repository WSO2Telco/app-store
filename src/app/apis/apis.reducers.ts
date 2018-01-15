import { ApisState, ApiSearchResult, ApiStatus } from './apis.models';
import { ApisService } from './apis.service';
import * as apiActions from './apis.actions';
import { Operator } from '../app.models';

const initialState: ApisState = {
    apiSearchResult: new ApiSearchResult(),
    apiStatus: [
        ApiStatus.ALL,
        ApiStatus.PRODUCTION,
        ApiStatus.PROTOTYPED],
    userApplications: [],
    selectedOperators: []
};

export function apisReducer(state: ApisState = initialState, action: apiActions.Actions) {
    switch (action.type) {
        case apiActions.DO_API_SEARCH_SUCCESS: {
            return Object.assign({}, state, { apiSearchResult: action.payload });
        }

        case apiActions.GET_USER_APPLICATIONS_SUCCESS: {
            return Object.assign({}, state, { userApplications: action.payload });
        }

        case apiActions.ADD_OPERATOR_TO_SELECTION: {
            return Object.assign({}, state, { selectedOperators: [...state.selectedOperators, action.payload] });
        }

        case apiActions.REMOVE_OPERATOR_FROM_SELECTION: {
            return Object.assign({}, state,
                { selectedOperators: state.selectedOperators.filter((op: Operator) => op.mnc !== action.payload.mnc) });
        }

        default:
            return state;
    }
}
