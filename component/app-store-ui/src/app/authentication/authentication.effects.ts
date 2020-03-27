
import { EMPTY, of } from 'rxjs';
import { catchError, switchMap, map, mergeMap } from 'rxjs/operators';
import { Actions, Effect, createEffect, ofType } from "@ngrx/effects";
import * as loginActions from "./authentication.actions";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { LoginFormData, LoginResponseData, RegClientData, TokenData } from "./authentication.models";
import { NotificationService } from "../shared/services/notification.service";
import { Router } from "@angular/router";
import { AppState } from "../app.data.models";
import { Store } from "@ngrx/store";
import { BnNgIdleService } from 'bn-ng-idle';

@Injectable()
export class AuthenticationEffects {
  private lastAuthRequiredRoute: string;

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private notification: NotificationService,
    private router: Router,
    private store: Store<AppState>,
    private bnIdle: BnNgIdleService
  ) {
    this.store
      .select(s => s.authentication.lastAuthRequiredRoute)
      .subscribe(route => {
        this.lastAuthRequiredRoute = route;
      });
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.DoLoginAction),
    mergeMap(({ payload }) => this.authService.login(new LoginFormData(payload.username, payload.password))
      .pipe(
        map((response: LoginResponseData) => {
          if (response.error) {
            let msg = (response.message) ? response.message : "Invalid username or password";
            return loginActions.LoginFailedAction({ payload: msg });
          } else {
            return loginActions.LoginSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => of(loginActions.LoginFailedAction({ payload: e.message })))
      )
    )
  ));

  clientRegister$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.ClientRegistrationAction),
    mergeMap(({ payload }) => this.authService.clientAppRegistration(payload)
      .pipe(
        map((response: RegClientData) => {
          if (!response.error) {
            localStorage.setItem('tkx', btoa(response.clientId + ':' + response.clientSecret));

            this.bnIdle.startWatching(180).subscribe((res) => {
              if (res) {
                this.store.dispatch(loginActions.DoLogoutAction());
                localStorage.setItem("autologout", "true");
              }
            })

            return loginActions.ClientRegistrationSuccessAction({ "payload": response })
          } else {
            throw Error("Operation Failed");
          }
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  tokenGeneration$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.TokenGenerationAction),
    mergeMap(({ payload }) => this.authService.tokenGeneration(payload)
      .pipe(
        map((response: TokenData) => {
          if (!response.error) {
            this.authService.startTimer(response.expires_in);
            localStorage.setItem('rtkn', response.refresh_token);
            this.router.navigate([this.lastAuthRequiredRoute || "home"]);
            return loginActions.TokenGenerationSuccessAction({ "payload": response });
          } else {
            throw Error("Operation Failed");
          }
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  tokenRefresh$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.TokenRefreshAction),
    mergeMap(() => this.authService.tokenRefresh()
      .pipe(
        map((response: TokenData) => {
          this.authService.startTimer(response.expires_in);
          localStorage.setItem('rtkn', response.refresh_token);
          return loginActions.TokenRefreshSuccessAction({ "payload": response });
        }),
        catchError((e: HttpErrorResponse) => {
          localStorage.removeItem('rtkn');
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
          this.bnIdle.stopTimer();
          location.replace("/app-store");
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
    mergeMap(({ payload }) => this.authService.signup(payload)
      .pipe(
        map((response) => {
          if (response.error) {
            this.notification.error(response.message);
          } else {
            this.notification.success('User added successfully. You can now sign into the API store using the new user account');
            return loginActions.SignupUserSuccessAction({ "payload": response });
          }
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
    mergeMap(({ payload }) => this.authService.changePassword(payload)
      .pipe(
        map((response) => {
          if (response.error) {
            this.notification.error(response.message);
            throw response;
          } else {
            this.notification.success('User password changed successfully. You can now sign in to the API store using the new password.');
            return loginActions.ChangeUserPwSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  forgetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.ForgetPwAction),
    mergeMap(({ payload }) => this.authService.forgetPassword(payload)
      .pipe(
        map((response) => {
          if (response.error) {
            this.notification.error(response.message);
            throw response;
          } else {
            this.notification.success('Please check your email for the password reset link');
            return loginActions.ForgetPwSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  updateForgetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.UpdateForgetPwAction),
    mergeMap(({ payload }) => this.authService.UpdateForgetPw(payload)
      .pipe(
        map((response) => {
          if (response.error) {
            this.notification.error(response.message);
            throw response;
          } else {
            this.notification.success('New Password successfully updated ');
            return loginActions.UpdateForgetPwSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));


  getThemeInfo$ = createEffect(() => this.actions$.pipe(
    ofType(loginActions.GetThemeAction),
    mergeMap(({ payload }) => this.authService.getThemeData(payload)
      .pipe(
        map((response) => {
          if (response == null) {
            throw response;
          } else {
            return loginActions.GetThemeSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          return EMPTY
        })
      )
    )
  ));

}
