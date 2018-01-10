import { AuthState } from './authentication/authentication.models';
import { ApisState } from './apis/apis.models';

export interface AppState {
    authentication: AuthState;
    apis: ApisState;
    global: GlobalState;
}

export interface GlobalState {
    layout: {
        rightNavOpened: boolean;
        leftNavOpened: boolean;
    };
}
