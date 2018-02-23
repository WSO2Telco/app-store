import { Action } from '@ngrx/store';
import { Country, Operator, Tier } from './app.data.models';

export const TOGGLE_RIGHT_NAV_PANEL = 'TOGGLE_RIGHT_NAV_PANEL';
export const TOGGLE_LEFT_NAV_PANEL = 'TOGGLE_LEFT_NAV_PANEL';
export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
export const LOAD_OPERATORS = 'LOAD_OPERATORS';
export const LOAD_OPERATORS_SUCCESS = 'LOAD_OPERATORS_SUCCESS';
export const APP_THEME_CHANGE = 'APP_THEME_CHANGE';
export const APP_THEME_CHANGE_SUCCESS = 'APP_THEME_CHANGE_SUCCESS';
export const TOGGLE_PARTICLE_ANIMATION = 'TOGGLE_PARTICLE_ANIMATION';
export const TOGGLE_MENU_BACKGROUND_IMAGE = 'TOGGLE_MENU_BACKGROUND_IMAGE';


export class ToggleRightPanelAction implements Action {
    type: string = TOGGLE_RIGHT_NAV_PANEL;
    constructor(public payload: boolean) { }
}

export class ToggleLeftPanelAction implements Action {
    type: string = TOGGLE_LEFT_NAV_PANEL;
    constructor(public payload: boolean) { }
}

export class LoadCountriesAction implements Action {
    type: string = LOAD_COUNTRIES;
    constructor(public payload: any = {}) { }
}

export class LoadCountriesSuccessAction implements Action {
    type: string = LOAD_COUNTRIES_SUCCESS;
    constructor(public payload: Country[]) { }
}

export class LoadOperatorsAction implements Action {
    type: string = LOAD_OPERATORS;
    constructor(public payload: Country) { }
}

export class LoadOperatorsSuccessAction implements Action {
    type: string = LOAD_OPERATORS_SUCCESS;
    constructor(public payload: Operator[]) { }
}

export class AppThemeChangeAction implements Action {
    type: string = APP_THEME_CHANGE;
    constructor(public payload: string) { }
}
export class AppThemeChangeSuccessAction implements Action {
    type: string = APP_THEME_CHANGE_SUCCESS;
    constructor(public payload: any = null) { }
}

export class ToggleParticleAction implements Action {
    type: string = TOGGLE_PARTICLE_ANIMATION;
    constructor(public payload: boolean) { }
}

export class ToggleMenuBackgroundAction implements Action {
    type: string = TOGGLE_MENU_BACKGROUND_IMAGE;
    constructor(public payload: boolean) { }
}

export type Actions
    = ToggleRightPanelAction
    | ToggleLeftPanelAction
    | LoadCountriesAction
    | LoadOperatorsAction
    | LoadOperatorsSuccessAction
    | AppThemeChangeAction
    | AppThemeChangeSuccessAction
    | ToggleParticleAction
    | ToggleMenuBackgroundAction;


