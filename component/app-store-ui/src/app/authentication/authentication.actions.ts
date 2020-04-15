import { createAction, props } from "@ngrx/store";
import { LoginFormData, LoginResponseData, ClientRegParam, RegClientData, TokenData, TokenGenerationParam, SigUpUserParam, ResetPasswordParam, ForgetPasswordParam, ForgetResetPasswordParam } from "./authentication.models";

export const DoLoginAction = createAction('[Auth] Login', props<{payload: LoginFormData}>());
export const LoginSuccessAction = createAction('[Auth] Login Success ✓', props<{payload: LoginResponseData}>());
export const LoginFailedAction = createAction('[Auth] Login Failed Action', props<{payload: string}>());

export const DoLogoutAction = createAction('[Auth] Logout');
export const DoLogoutSuccessAction = createAction('[Auth] Logout Success ✓');

export const GetThemeAction = createAction('[Auth] Get Theme', props<{ payload: string }>());
export const GetThemeSuccessAction = createAction('[Auth] Get Theme Success ✓', props<{ payload: any }>());

export const SetThemeAction = createAction('[Auth] Set Theme');
export const SetThemeSuccessAction = createAction('[Auth] Set Theme Success ✓');

export const SetLastAuthRequiredRouteAction = createAction('[Auth] Set Last Auth Required Route', props<{payload: string}>());
export const SetLoggedUserAction = createAction('[Auth] Set Logged User', props<{payload: string}>());

export const SignupUserAction = createAction('[Auth] Signup', props<{payload: SigUpUserParam}>());
export const SignupUserSuccessAction = createAction('[Auth] Signup Success ✓', props<{payload: any}>());
export const SignupUserFailedAction = createAction('[Auth] Signup Failed Action', props<{payload: string}>());

export const ChangeUserPwAction = createAction('[Auth] Change Password', props<{payload: ResetPasswordParam}>());
export const ChangeUserPwSuccessAction = createAction('[Auth] Change Password Success ✓', props<{payload: any}>());

export const ForgetPwAction = createAction('[Auth] Forget Password', props<{payload: ForgetPasswordParam}>());
export const ForgetPwSuccessAction = createAction('[Auth] Forget Password Success ✓', props<{payload: any}>());

export const UpdateForgetPwAction = createAction('[Auth] Update Forget Password', props<{payload: ForgetResetPasswordParam}>());
export const UpdateForgetPwSuccessAction = createAction('[Auth] Update Forget Password Success ✓', props<{payload: any}>());

export const ClientRegistrationAction = createAction('[Auth] Client Reg App', props<{payload: LoginFormData}>());
export const ClientRegistrationSuccessAction = createAction('[Auth] Client Reg App Success ✓', props<{payload: RegClientData}>());

export const TokenGenerationAction = createAction('[Auth] Token Generation', props<{payload: LoginFormData}>());
export const TokenGenerationSuccessAction = createAction('[Auth] Token Generation Success ✓', props<{payload: TokenData}>());

export const TokenRefreshAction = createAction('[Auth] Token Refresh');
export const TokenRefreshSuccessAction = createAction('[Auth] Token Refresh Success ✓', props<{payload: TokenData}>());