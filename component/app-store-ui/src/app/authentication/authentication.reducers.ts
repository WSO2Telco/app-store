import * as loginActions from './authentication.actions';
import { LoginMenuActionTypes } from './authentication.models';
import { AuthState } from './authentication.models';
import { createReducer, on } from '@ngrx/store';

const defaultMenu = [
    { name: 'Login', action: LoginMenuActionTypes.LOGIN },
    { name: 'Sign up', action: LoginMenuActionTypes.SIGNUP },
    { name: 'Theme', action: LoginMenuActionTypes.THEME },
    { name: 'Help', action: LoginMenuActionTypes.HELP }
];

const loggedInMenu = [
    { name: 'Account', action: LoginMenuActionTypes.MYACCOUNT },
    { name: 'Theme', action: LoginMenuActionTypes.THEME },
    { name: 'Logout', action: LoginMenuActionTypes.LOGOUT }
];

const initState: AuthState = {
    loginData: null,
    menuData: defaultMenu,
    lastAuthRequiredRoute: null,
    registeredAppData: null,
    tokenDetails: null,
    loggedUser: null
};


const _authReducer = createReducer(initState,

    on(loginActions.LoginSuccessAction, (state, { payload }) => ({
        ...state, loginData: payload, menuData: loggedInMenu
    })),

    on(loginActions.DoLogoutAction, (state, { }) => ({
        ...state, loginData: null, registeredAppData: null, tokenDetails: null, menuData: defaultMenu, loggedUser: null
    })),

    on(loginActions.SetLastAuthRequiredRouteAction, (state, { payload }) => ({
        ...state, lastAuthRequiredRoute: payload
    })),

    on(loginActions.SetLoggedUserAction, (state, { payload }) => ({
        ...state, loggedUser: payload
    })),

    on(loginActions.ClientRegistrationSuccessAction, (state, { payload }) => ({
        ...state, registeredAppData: payload
    })),

    on(loginActions.TokenGenerationSuccessAction, (state, { payload }) => ({
        ...state, tokenDetails: payload
    })),

    on(loginActions.TokenRefreshSuccessAction, (state, { payload }) => ({
        ...state, tokenDetails: payload
    }))
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}