import { Action, createAction, props } from '@ngrx/store';
import { ApiSearchParam, ApiSearchResult, Application, SubscribeParam, ApiSummery, ApiOverview } from './apis.models';
import { Operator } from '../app.data.models';

export const DO_API_SEARCH = 'DO_API_SEARCH';
export const DO_API_SEARCH_SUCCESS = 'DO_API_SEARCH_SUCCESS';
export const GET_USER_APPLICATIONS = 'GET_USER_APPLICATIONS';
export const GET_USER_APPLICATIONS_SUCCESS = 'GET_USER_APPLICATIONS_SUCCESS';
export const REMOVE_ALL_OPERATOR_FROM_SELECTION = 'REMOVE_ALL_OPERATOR_FROM_SELECTION';
export const DO_SUBSCRIBE = 'DO_SUBSCRIBE';
export const DO_SUBSCRIBE_SUCCESS = 'DO_SUBSCRIBE_SUCCESS';
export const GET_API_OVERVIEW = 'GET_API_OVERVIEW';
export const GET_API_OVERVIEW_SUCCESS = 'GET_API_OVERVIEW_SUCCESS';

export const ADD_OPERATOR_TO_SELECTION = 'ADD_OPERATOR_TO_SELECTION';
export const REMOVE_OPERATOR_FROM_SELECTION = 'REMOVE_OPERATOR_FROM_SELECTION';


// export class DoApiSearchAction implements Action {
//     readonly type: string = DO_API_SEARCH;
//     constructor(public payload: ApiSearchParam) { }
// }

// export class ApiSearchSuccessAction {
//     readonly type: string = DO_API_SEARCH_SUCCESS;
//     constructor(public payload: ApiSearchResult) { }
// }

export class GetUserApplicationsAction {
    readonly type: string = GET_USER_APPLICATIONS;
    constructor(public payload: any = null) { }
}

export class GetUserApplicationsSuccessAction {
    readonly type: string = GET_USER_APPLICATIONS_SUCCESS;
    constructor(public payload: Application[]) { }
}

export class AddOperatorToSelectionAction {
    readonly type: string = ADD_OPERATOR_TO_SELECTION;
    constructor(public payload: Operator) { }
}

export class RemoveOperatorFromSelectionAction {
    readonly type: string = REMOVE_OPERATOR_FROM_SELECTION;
    constructor(public payload: Operator) { }
}

export class RemoveAllOperatorFromSelectionAction {
    readonly type: string = REMOVE_ALL_OPERATOR_FROM_SELECTION;
    constructor(public payload: any = null) { }
}

export class DoSubscribeAction {
    readonly type: string = DO_SUBSCRIBE;
    constructor(public payload: SubscribeParam) { }
}

export class DoSubscribeSuccessAction {
    readonly type: string = DO_SUBSCRIBE_SUCCESS;
    constructor(public payload: any = null) { }
}

// export class GetApiOverviewAction {
//     readonly type: string = GET_API_OVERVIEW;
//     constructor(public payload: any = null) { }
// }
// export class GetApiOverviewSuccessAction {
//     readonly type: string = GET_API_OVERVIEW_SUCCESS;
//     constructor(public payload: ApiOverview) { }
// }


export type Actions
    = GetUserApplicationsAction
    | GetUserApplicationsSuccessAction
    | AddOperatorToSelectionAction
    | RemoveOperatorFromSelectionAction
    | RemoveAllOperatorFromSelectionAction
    | DoSubscribeAction
    | DoSubscribeSuccessAction;


export const DoApiSearchAction = createAction('[API] Search', props<{payload: ApiSearchParam}>());
export const ApiSearchSuccessAction = createAction('[API] Search Success ✓', props<{payload: ApiSearchResult}>());

export const GetApiOverviewAction = createAction('[API] Get API Overview', props<{payload: string}>());
export const GetApiOverviewSuccessAction = createAction('[API] Get API Overview Success ✓', props<{payload: ApiOverview}>());