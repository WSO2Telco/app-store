import { Action } from '@ngrx/store';
import { Country } from './app.models';

export const TOGGLE_RIGHT_NAV_PANEL = 'TOGGLE_RIGHT_NAV_PANEL';
export const TOGGLE_LEFT_NAV_PANEL = 'TOGGLE_LEFT_NAV_PANEL';
export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';

export class ToggleRightPanelAction implements Action {
    type: string = TOGGLE_RIGHT_NAV_PANEL;
    constructor(public payload: boolean) { }
}

export class ToggleLeftPanelAction implements Action {
    type: string = TOGGLE_LEFT_NAV_PANEL;
    constructor(public payload: any = null) { }
}

export class LoadCountriesAction implements Action {
    type: string = LOAD_COUNTRIES;
    constructor(public payload: any = {}) { }
}

export class LoadCountriesSuccessAction implements Action {
    type: string = LOAD_COUNTRIES_SUCCESS;
    constructor(public payload: Country[]) { }
}


export type Actions
    = ToggleRightPanelAction
    | ToggleLeftPanelAction
    | LoadCountriesAction;


