import { Action } from "@ngrx/store";
import { LoginFormData, LoginResponseData } from "./authentication.models";

export const DO_LOGIN = 'DO_LOGIN';
export const LOGIN_SUCCESS = 'DO_LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export class DoLoginAction implements Action {
    readonly type: string = DO_LOGIN;

    constructor(public payload: LoginFormData) { }
}

export class LoginSuccessAction implements Action {
    readonly type: string = LOGIN_SUCCESS;
    constructor(public payload: LoginResponseData) { }
}

export type Actions =
    DoLoginAction |
    LoginSuccessAction;

