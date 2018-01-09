import { Action } from '@ngrx/store';
import { ApiSearchParam, ApiSearchResult } from './apis.models';

export const DO_API_SEARCH = 'DO_API_SEARCH';
export const DO_API_SEARCH_SUCCESS = 'DO_API_SEARCH_SUCCESS';

export class DoApiSearchAction implements Action {
    readonly type: string = DO_API_SEARCH;
    constructor(public payload: ApiSearchParam) { }
}

export class ApiSearchSuccessAction {
    readonly type: string = DO_API_SEARCH_SUCCESS;
    constructor(public payload: ApiSearchResult) { }
}

export type Actions =
    DoApiSearchAction;
