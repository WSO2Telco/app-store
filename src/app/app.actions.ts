import { Action } from '@ngrx/store';

export const TOGGLE_RIGHT_NAV_PANEL = 'TOGGLE_RIGHT_NAV_PANEL';

export class ToggleRightPanelAction implements Action {
    type: string = TOGGLE_RIGHT_NAV_PANEL;
    constructor(public payload: boolean) { }
}

export type Actions =
    ToggleRightPanelAction;
