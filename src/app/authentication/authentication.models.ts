export class LoginAction {
    constructor(public type: 'Login' | 'Help') {
    }
}

export class LoginFormData {
    constructor(public userName: string, public password: string) { }
}
