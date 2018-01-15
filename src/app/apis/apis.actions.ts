import { Action } from '@ngrx/store';
import { ApiSearchParam, ApiSearchResult, Application } from './apis.models';
import { Operator } from '../app.models';

export const DO_API_SEARCH = 'DO_API_SEARCH';
export const DO_API_SEARCH_SUCCESS = 'DO_API_SEARCH_SUCCESS';
export const GET_USER_APPLICATIONS = 'GET_USER_APPLICATIONS';
export const GET_USER_APPLICATIONS_SUCCESS = 'GET_USER_APPLICATIONS_SUCCESS';
export const ADD_OPERATOR_TO_SELECTION = 'ADD_OPERATOR_TO_SELECTION';
export const REMOVE_OPERATOR_FROM_SELECTION = 'REMOVE_OPERATOR_FROM_SELECTION';

export class DoApiSearchAction implements Action {
    readonly type: string = DO_API_SEARCH;
    constructor(public payload: ApiSearchParam) { }
}

export class ApiSearchSuccessAction {
    readonly type: string = DO_API_SEARCH_SUCCESS;
    constructor(public payload: ApiSearchResult) { }
}

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

export type Actions
    = DoApiSearchAction
    | ApiSearchSuccessAction
    | GetUserApplicationsAction
    | GetUserApplicationsSuccessAction
    | AddOperatorToSelectionAction
    | RemoveOperatorFromSelectionAction;

