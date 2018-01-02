import { Action } from "@ngrx/store";
import { LoginFormData } from "./authentication.models";

export const DO_LOGIN = 'DO_LOGIN';
export const LOGIN_SUCCESS = 'DO_LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export class DoLogin implements Action {
    readonly type: string = DO_LOGIN;

    constructor(public payload: LoginFormData) {}
}

export type Actions =
    DoLogin;

