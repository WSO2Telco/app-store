import * as loginActions from './authentication.actions';
import { LoginResponseData, LoginMenuActionTypes } from './authentication.models';
import { AuthState } from './authentication.models';

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
    menuData: defaultMenu
};


export function authReducer(state: AuthState = initState, action: loginActions.Actions) {
    switch (action.type) {
        case loginActions.LOGIN_SUCCESS: {
            return Object.assign({}, state,
                {
                    loginData: action.payload,
                    menuData: loggedInMenu
                });
        }

        case loginActions.DO_LOGOUT_SUCCESS: {
            return Object.assign({}, state, {
                loginData: null,
                menuData: defaultMenu
            });
        }

        default: {
            return state;
        }
    }

}
