import { Action, createAction, props } from "@ngrx/store";
import { LoginFormData, LoginResponseData } from "./authentication.models";
import {
  SigUpUserParam,
  ResetPasswordParam
} from "./authentication.data.models";

export const DoLoginAction = createAction('[Auth] Login', props<{payload: LoginFormData}>());
export const LoginSuccessAction = createAction('[Auth] Login Success ✓', props<{payload: LoginResponseData}>());

export const DoLogoutAction = createAction('[Auth] Logout');
export const DoLogoutSuccessAction = createAction('[Auth] Logout Success ✓');

export const SetLastAuthRequiredRouteAction = createAction('[Auth] Set Last Auth Required Route', props<{payload: string}>());

export const SignupUserAction = createAction('[Auth] Signup', props<{payload: SigUpUserParam}>());
export const SignupUserSuccessAction = createAction('[Auth] Signup Success ✓', props<{payload: any}>());

export const ChangeUserPwAction = createAction('[Auth] Change Password', props<{payload: ResetPasswordParam}>());
export const ChangeUserPwSuccessAction = createAction('[Auth] Change Password Success ✓', props<{payload: any}>());