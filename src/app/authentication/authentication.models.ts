export class LoginAction {
    constructor(public type: 'Login' | 'Help') {
    }
}

export class LoginFormData {
    constructor(public username: string, public password: string) { }
}

export class LoginResponseData {
    constructor(
        public username: string,
        public permissions: any,
        public error: boolean = false,
        public messages: string = '') { }
}
