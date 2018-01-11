import { AuthState } from './authentication/authentication.models';
import { ApisState } from './apis/apis.models';

export interface AppState {
    authentication: AuthState;
    apis: ApisState;
    global: GlobalState;
}

export interface Country {
    country: string;
    country_code: number;
}

export interface GlobalState {
    layout: {
        rightNavOpened: boolean;
        leftNavOpened: boolean;
    };
    mccAndmnc: {
        countries: Country[];
    };
}
