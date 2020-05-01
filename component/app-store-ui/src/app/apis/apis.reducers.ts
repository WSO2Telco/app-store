import { ApiListDetail, paginationData, ApiEntityState } from './apis.models';
import { ApiSearchSuccessAction, GetAvailableApplicationSuccessAction, GetSelectedAppSuccessAction } from './apis.actions';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromRoot from '../app.data.models';
import { ApplicationListResult } from '../applications/applications.data.models';

export const apiListAdapter: EntityAdapter<ApiListDetail> = createEntityAdapter<ApiListDetail>();

export const defaultApiList: ApiEntityState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    previous: "",
    next: "",
    count: 0,
    availableApp: new ApplicationListResult(),
    pagination: new paginationData()
}

export interface AppState extends fromRoot.AppState {
    apis: ApiEntityState
}

const initState = apiListAdapter.getInitialState(defaultApiList);

const _apisReducer = createReducer(initState,

    on(ApiSearchSuccessAction, (state, { payload }) => {
        return apiListAdapter.addAll(payload.list, {
            ...state,
            entities: {},
            loaded: true,
            loading: false,
            count: payload.count,
            previous: payload.previous,
            next: payload.next,
            pagination : payload.pagination
        })
    }),

    on(GetAvailableApplicationSuccessAction, (state, { payload }) => ({
        ...state, availableApp: payload
    })),

    // on(GetUserApplicationsSuccessAction, (state, { payload }) => ({
    //     ...state, userApplications: payload
    // })),

    on(GetSelectedAppSuccessAction, (state, { payload }) => ({
        ...state, selectedApplication: payload
    }))

    // on(AddOperatorToSelectionAction, (state, { payload }) => ({
    //     ...state, selectedOperators: [...state.selectedOperators.filter((op: Operator) => op.mnc !== payload.mnc), payload]
    // })),

    // on(RemoveOperatorFromSelectionAction, (state, { payload }) => ({
    //     ...state, selectedOperators: state.selectedOperators.filter((op: Operator) => op.mnc !== payload.mnc)
    // })),

    // on(RemoveAllOperatorFromSelectionAction, (state, { payload }) => ({
    //     ...state, selectedOperators: []
    // }))
);

export function apisReducer(state, action) {
    return _apisReducer(state, action);
}


/*
  Forum Selectors
*/

const getApiFeatureState = createFeatureSelector<ApiEntityState>("apis");

export const getApis = createSelector(getApiFeatureState, apiListAdapter.getSelectors().selectAll);
export const getApi = (id: string) => createSelector(getApiFeatureState, state => state.entities[id]);