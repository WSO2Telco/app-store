import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import * as loginActions from './authentication.actions';

export class AuthenticationEffects {
    constructor(private http: Http, private actions: Actions) { }

    @Effect() login = this.actions
        .ofType(loginActions.DO_LOGIN)
        .map((action) => {
            return {
                action: 'login',
                username: 'admin',
                password: 'admin',
                tenant: null
            })
        .switchMap()

}
