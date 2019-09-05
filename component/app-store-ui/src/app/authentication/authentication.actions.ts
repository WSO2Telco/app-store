import { Action, createAction, props } from "@ngrx/store";
import { LoginFormData, LoginResponseData } from "./authentication.models";
import {
  SigUpUserParam,
  ResetPasswordParam
} from "./authentication.data.models";

export const DO_LOGIN = "DO_LOGIN";
export const LOGIN_SUCCESS = "DO_LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const DO_LOGOUT = "DO_LOGOUT";
export const DO_LOGOUT_SUCCESS = "DO_LOGOUT_SUCCESS";

export const SET_LAST_AUTH_REQUIRED_ROUTE = "SET_LAST_AUTH_REQUIRED_ROUTE";

export const SIGNUP_USER = "SIGNUP_USER";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";

export const CHANGE_USER_PW = "CHANGE_USER_PW";
export const CHANGE_USER_PW_SUCCESS = "CHANGE_USER_PW_SUCCESS";


export const DoLoginAction = createAction('[Auth] Login', props<{payload: LoginFormData}>());
export const LoginSuccessAction = createAction('[Auth] Login Success ✓', props<{payload: LoginResponseData}>());

export const DoLogoutAction = createAction('[Auth] Logout');
export const DoLogoutSuccessAction = createAction('[Auth] Logout Success ✓');

export const SetLastAuthRequiredRouteAction = createAction('[Auth] Set Last Auth Required Route', props<{payload: string}>());

export const SignupUserAction = createAction('[Auth] Signup', props<{payload: SigUpUserParam}>());
export const SignupUserSuccessAction = createAction('[Auth] Signup Success ✓', props<{payload: any}>());

export const ChangeUserPwAction = createAction('[Auth] Change Password', props<{payload: ResetPasswordParam}>());
export const ChangeUserPwSuccessAction = createAction('[Auth] Change Password Success ✓', props<{payload: any}>());