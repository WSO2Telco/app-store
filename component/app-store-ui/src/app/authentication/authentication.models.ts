export interface AuthState {
    loginData: LoginResponseData;
    menuData: IMenuItem[];
    lastAuthRequiredRoute:string;
}

export interface IMenuItem {
    name: string;
    action: LoginMenuActionTypes;
}

export class LoginMenuAction {
    constructor(public type: LoginMenuActionTypes) {
    }
}

export enum LoginMenuActionTypes {
    LOGIN = 'login',
    LOGOUT = 'logout',
    SIGNUP = 'signup',
    MYACCOUNT = 'my-account',
    HELP = 'help'
}

export class LoginFormData {
    constructor(public username: string, public password: string) { }
}

export class LoginResponseData {
    constructor(
        public username: string,
        public permissions: any,
        public error: boolean = false,
        public message: string = '') { }
}

export class LogoutResponseData {
    constructor(data: any) { }
}
