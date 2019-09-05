import { ApisState, ApiSearchResult, ApiStatus, ApiOverview } from './apis.models';
import { ApisService } from './apis.service';
import { ApiSearchSuccessAction, GetApiOverviewSuccessAction } from './apis.actions';
import { Operator } from '../app.data.models';
import { createReducer, on } from '@ngrx/store';

const initialState: ApisState = {
    apiSearchResult: new ApiSearchResult(),
    selectedApi: new ApiOverview,
    apiStatus: [
        ApiStatus.ALL,
        ApiStatus.PRODUCTION,
        ApiStatus.PROTOTYPED],
    userApplications: [],
    selectedOperators: [],
    isSubscriptionSuccess: false
};

// export function apisReducer(state: ApisState = initialState, action: apiActions.Actions) {
//     switch (action.type) {
//         case apiActions.DO_API_SEARCH_SUCCESS: {
//             return Object.assign({}, state, { apiSearchResult: action.payload });
//         }

//         case apiActions.GET_USER_APPLICATIONS_SUCCESS: {
//             return Object.assign({}, state, { userApplications: action.payload });
//         }

//         case apiActions.GET_API_OVERVIEW_SUCCESS: {
//             return Object.assign({}, state, {
//                 selectedApi: action.payload
//             });
//         }

//         case apiActions.ADD_OPERATOR_TO_SELECTION: {
//             return Object.assign({}, state, {
//                 selectedOperators:
//                     [...state.selectedOperators.filter((op: Operator) => op.mnc !== action.payload.mnc), action.payload]
//             });
//         }

//         case apiActions.REMOVE_OPERATOR_FROM_SELECTION: {
//             return Object.assign({}, state,
//                 { selectedOperators: state.selectedOperators.filter((op: Operator) => op.mnc !== action.payload.mnc) });
//         }

//         case apiActions.REMOVE_ALL_OPERATOR_FROM_SELECTION: {
//             return Object.assign({}, state,
//                 { selectedOperators: [] });
//         }

//         default:
//             return state;
//     }
// }

const _apisReducer = createReducer(initialState,
    on(ApiSearchSuccessAction, (state, { payload }) => ({
        ...state, apiSearchResult: payload
    })),
    on(GetApiOverviewSuccessAction, (state, { payload }) => ({
        ...state, selectedApi: payload
    })),
);

export function apisReducer(state, action) {
    return _apisReducer(state, action);
}