import * as loginActions from './authentication.actions';
import { LoginResponseData, LoginMenuActionTypes } from './authentication.models';
import { AuthState } from './authentication.models';
import { SET_LAST_AUTH_REQUIRED_ROUTE } from './authentication.actions';
import { createReducer, on } from '@ngrx/store';

const defaultMenu = [
    { name: 'Login', action: LoginMenuActionTypes.LOGIN },
    { name: 'Sign up', action: LoginMenuActionTypes.SIGNUP },
    { name: 'Help', action: LoginMenuActionTypes.HELP }
];

const loggedInMenu = [
    { name: 'My Accunt', action: LoginMenuActionTypes.MYACCOUNT },
    { name: 'Logout', action: LoginMenuActionTypes.LOGOUT }
];

const initState: AuthState = {
    loginData: null,
    menuData: defaultMenu,
    lastAuthRequiredRoute : null
};

const _authReducer = createReducer(initState,

    on(loginActions.LoginSuccessAction, (state, { payload }) => ({
        ...state, loginData: payload, menuData: loggedInMenu
    })),

    on(loginActions.DoLogoutSuccessAction, (state, {}) => ({
        ...state, loginData: null, menuData: defaultMenu
    })),

    on(loginActions.SetLastAuthRequiredRouteAction, (state, { payload }) => ({
        ...state, lastAuthRequiredRoute: payload
    }))
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}