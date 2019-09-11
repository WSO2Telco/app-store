import { ApisState, ApiSearchResult, ApiStatus, ApiOverview } from './apis.models';
import { ApisService } from './apis.service';
import { ApiSearchSuccessAction, GetApiOverviewSuccessAction, GetUserApplicationsSuccessAction, 
    AddOperatorToSelectionAction, RemoveOperatorFromSelectionAction, RemoveAllOperatorFromSelectionAction } from './apis.actions';
import { Operator } from '../app.data.models';
import { createReducer, on } from '@ngrx/store';

const initialState: ApisState = {
    apiSearchResult: new ApiSearchResult(),
    selectedApi: new ApiOverview,
    apiStatus: [
        ApiStatus.all,
        ApiStatus.published,
        ApiStatus.prototyped],
    userApplications: [],
    selectedOperators: [],
    isSubscriptionSuccess: false
};

const _apisReducer = createReducer(initialState,

    on(ApiSearchSuccessAction, (state, { payload }) => ({
        ...state, apiSearchResult: payload
    })),

    on(GetApiOverviewSuccessAction, (state, { payload }) => ({
        ...state, selectedApi: payload
    })),

    on(GetUserApplicationsSuccessAction, (state, { payload }) => ({
        ...state, userApplications: payload
    })),

    on(AddOperatorToSelectionAction, (state, { payload }) => ({
        ...state, selectedOperators: [...state.selectedOperators.filter((op: Operator) => op.mnc !== payload.mnc), payload]
    })),

    on(RemoveOperatorFromSelectionAction, (state, { payload }) => ({
        ...state, selectedOperators: state.selectedOperators.filter((op: Operator) => op.mnc !== payload.mnc)
    })),

    on(RemoveAllOperatorFromSelectionAction, (state, { payload }) => ({
        ...state, selectedOperators: []
    }))
);

export function apisReducer(state, action) {
    return _apisReducer(state, action);
}