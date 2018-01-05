import { Actions, Effect } from '@ngrx/effects';
import * as loginActions from './authentication.actions';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { LoginFormData, LoginResponseData, LogoutResponseData } from './authentication.models';
import { Observable } from 'rxjs/Observable';
import { DoLoginAction } from './authentication.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../shared/services/notification.service';

@Injectable()
export class AuthenticationEffects {
    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private authService: AuthenticationService,
        private notification: NotificationService) { }

    @Effect() login$ = this.actions$
        .ofType(loginActions.DO_LOGIN)
        .map((action: DoLoginAction) => action.payload)
        .switchMap((payload: any) => this.authService.login(new LoginFormData(payload.username, payload.password))
            .map((response: LoginResponseData) => {
                if (response.error) {
                    throw response;
                } else {
                    return new loginActions.LoginSuccessAction(response);
                }
            })
            .catch((e: HttpErrorResponse) => {
                this.notification.error(e.message);
                return Observable.empty();
            })
        );


    @Effect()
    logout$ = this.actions$
        .ofType(loginActions.DO_LOGOUT)
        .switchMap(() => this.authService.logout()
            .map((response: LogoutResponseData) => new loginActions.DoLogoutSuccessAction())
            .catch((e: HttpErrorResponse) => {
                this.notification.error(e.message);
                return Observable.empty();
            }));

}
