import { Actions, Effect } from '@ngrx/effects';
import * as loginActions from './authentication.actions';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { LoginFormData, LoginResponseData } from './authentication.models';
import { Observable } from 'rxjs/Observable';
import { DoLoginAction } from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private authService: AuthenticationService) { }

    @Effect() login$ = this.actions$
        .ofType(loginActions.DO_LOGIN)
        .map((action: DoLoginAction) => action.payload)
        .switchMap((payload: any) => this.authService.login(new LoginFormData(payload.username, payload.password))
            .map((response: LoginResponseData) => (new loginActions.LoginSuccessAction(response)))
        );

}
