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
    iso: string;
}

export class Operator {
    constructor(
        public network: string,
        public mcc: number,
        public mnc: number) { }
}
export interface CountryOperator {
    network: string;
    country: string;
    mcc: number;
    iso: number;
    country_code: number;
    mnc: number;
}

export interface GlobalState {
    layout: {
        rightNavOpened: boolean;
        leftNavOpened: boolean;
    };
    mccAndmnc: {
        countries: Country[];
        operators: Operator[];
    };
}
