export interface AuthState {
    loginData: LoginResponseData;
    menuData: IMenuItem[];
    lastAuthRequiredRoute: string;
    registeredAppData: RegClientData;
    tokenDetails:TokenData;
    loggedUser:string;
}

export interface IMenuItem {
    name: string;
    action: LoginMenuActionTypes;
}

export class LoginMenuAction {
    constructor(public type: LoginMenuActionTypes) {
    }
}


export class ClientRegParam {
    callbackUrl: string;
    clientName: string;
    owner: string;
    grantType: string;
    saasApp: boolean;
}

export class TokenGenerationParam {
    password: string;
    username: string;
    grant_type: string;
    scope: string;
}

export class TokenData {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expires_in: number
    error: any;
}

export interface RegClientData {
    clientId: string;
    clientName: string;
    callBackURL: string;
    clientSecret: string;
    isSaasApplication: boolean;
    appOwner: string;
    jsonString: string;
    jsonAppAttribute: string;
    tokenType: string;
    error: any;
}

export enum LoginMenuActionTypes {
    LOGIN = 'login',
    LOGOUT = 'logout',
    SIGNUP = 'signup',
    MYACCOUNT = 'my-account',
    HELP = 'help',
    THEME = 'theme'
}

export class LoginFormData {
    constructor(public username: string, public password: string) { }
}

export class LoginResponseData {
    constructor(
        public error: boolean = false,
        public message: string = '') { }
}

export class LogoutResponseData {
    constructor(data: any) { }
}

export class SigUpUserParam {
    username: string;
    password: string;
    allFieldsValues:string;
}

export class ResetPasswordParam{
    currentPassword:string;
    newPassword:string;
}

export class ResetPasswordResponseData {
    constructor(
        public error: boolean = false,
        public message: string = '') { }
}