import * as loginActions from './authentication.actions';
import { AppState } from '../app.reducer';
import { LoginResponseData } from './authentication.models';

export interface AuthState {
    loginData: LoginResponseData;
}

export const initState: AuthState = {
    loginData: null
};


export function authReducer(state: AuthState = initState, action: loginActions.Actions) {
    switch (action.type) {
        case loginActions.LOGIN_SUCCESS: {
            return Object.assign({}, state, action.payload);
        }

        default: {
            return state;
        }
    }

}
