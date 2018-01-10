import { ApisState, ApiSearchResult, ApiStatus } from './apis.models';
import { ApisService } from './apis.service';
import * as apiActions from './apis.actions';

const initialState: ApisState = {
    apiSearchResult: new ApiSearchResult(),
    apiStatus: [
        ApiStatus.ALL,
        ApiStatus.PRODUCTION,
        ApiStatus.PROTOTYPED]
};

export function apisReducer(state: ApisState = initialState, action: apiActions.Actions) {
    switch (action.type) {
        case apiActions.DO_API_SEARCH_SUCCESS: {
            return Object.assign({}, state, { apiSearchResult: action.payload });
        }
        default:
            return state;
    }
}
