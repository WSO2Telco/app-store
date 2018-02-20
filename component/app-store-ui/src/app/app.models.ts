import { AuthState } from './authentication/authentication.models';
import { ApisState } from './apis/apis.models';

export interface AppState {
    authentication: AuthState;
    apis: ApisState;
    global: GlobalState;
}

export interface Country {
    countryName: string;
    countryCode: string;
}

export class Operator {
    constructor(
        public brand: string,
        public operator: string,
        public mcc: number,
        public mnc: number) { }
}
export interface CountryOperator {
    type: string;
    countryName: string;
    countryCode: string;
    mcc: number;
    mnc: number;
    brand: string;
    operator: string;
    status: string;
    bands: string;
    notes: string;
}

export interface GlobalState {
    layout: {
        rightNavOpened: boolean;
        leftNavOpened: boolean;
        appTheme: string;
        particleAnimation: boolean;
        menuBackImage: boolean;
    };
    mccAndmnc: {
        countries: Country[];
        operators: Operator[];
    };
}


export class Tier {
    constructor(
        public tierName: string,
        public tierDisplayName: string,
        public tierDescription: string
    ) { }
}

export class MenuItem {
    public id: number;
    public name: string;
    public icon?: string;
    public route?: string[] = [];
    public subMenu?: MenuItem[] = null;
    public permissionPattern?= '*';
}
