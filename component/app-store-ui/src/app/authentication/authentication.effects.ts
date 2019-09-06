import * as loginActions from "./authentication.actions";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { LoginFormData, LoginResponseData } from "./authentication.models";
import { NotificationService } from "../shared/services/notification.service";
import { Router } from "@angular/router";
import { AppState } from "../app.data.models";
import { Store } from "@ngrx/store";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class AuthenticationEffects {
  private lastAuthRequiredRoute: string;

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private notification: NotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store
      .select(s => s.authentication.lastAuthRequiredRoute)
      .subscribe(route => {
        this.lastAuthRequiredRoute = route;
      });
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.DoLoginAction),
    mergeMap(({payload}) => this.authService.login(new LoginFormData(payload.username, payload.password))
      .pipe(
        map((response:LoginResponseData) => {
          if (response.error) {
              throw response;
          } else {
            this.router.navigate([this.lastAuthRequiredRoute || "home"]);
            return loginActions.LoginSuccessAction({ "payload" : response});
          }
        }),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.DoLogoutAction),
    mergeMap(() => this.authService.logout()
      .pipe(
        map(() => {
          this.router.navigate(["home"]);
          return loginActions.DoLogoutSuccessAction();
        }),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  signup$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.SignupUserAction),
    mergeMap(({payload}) => this.authService.signup(payload)
      .pipe(
        map((response) => {
          this.notification.success('User added successfully. You can now sign into the API store using the new user account'); 
          return loginActions.SignupUserSuccessAction({"payload":response});
        }),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  changePassword$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.ChangeUserPwAction),
    mergeMap(({payload}) => this.authService.changePassword(payload)
      .pipe(
        map((response) => {
          this.notification.success('User password changed successfully. You can now sign in to the API store using the new password.'); 
          return loginActions.ChangeUserPwSuccessAction({"payload":response});
        }),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));
}
