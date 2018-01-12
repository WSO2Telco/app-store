import { Action } from '@ngrx/store';
import { ApiSearchParam, ApiSearchResult, Application } from './apis.models';

export const DO_API_SEARCH = 'DO_API_SEARCH';
export const DO_API_SEARCH_SUCCESS = 'DO_API_SEARCH_SUCCESS';
export const GET_USER_APPLICATIONS = 'GET_USER_APPLICATIONS';
export const GET_USER_APPLICATIONS_SUCCESS = 'GET_USER_APPLICATIONS_SUCCESS';

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

export type Actions =
    DoApiSearchAction;
