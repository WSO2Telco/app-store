import { AuthState } from './authentication/authentication.models';

export interface AppState {
    authentication: AuthState;
    global: GlobalState;
}

export interface GlobalState {
    layout: {
        rightNavOpened: boolean;
    };
}
