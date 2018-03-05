import { Actions, Effect } from "@ngrx/effects";
import * as loginActions from "./authentication.actions";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import "rxjs/add/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import {
  LoginFormData,
  LoginResponseData,
  LogoutResponseData
} from "./authentication.models";
import { Observable } from "rxjs/Observable";
import { DoLoginAction } from "./authentication.actions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from "../shared/services/notification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppState } from "../app.data.models";
import { Store } from "@ngrx/store";

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

  @Effect()
  login$ = this.actions$
    .ofType(loginActions.DO_LOGIN)
    .map((action: DoLoginAction) => action.payload)
    .switchMap((payload: any) =>
      this.authService
        .login(new LoginFormData(payload.username, payload.password))
        .map((response: LoginResponseData) => {
          if (response.error) {
            throw response;
          } else {
            this.router.navigate([this.lastAuthRequiredRoute || 'home']);
            return new loginActions.LoginSuccessAction(response);
          }
        })
        .catch((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return Observable.empty();
        })
    );

  @Effect()
  logout$ = this.actions$.ofType(loginActions.DO_LOGOUT).switchMap(() =>
    this.authService
      .logout()
      .map((response: LogoutResponseData) => {
        this.router.navigate(["home"]);
        return new loginActions.DoLogoutSuccessAction();
      })
      .catch((e: HttpErrorResponse) => {
        this.notification.error(e.message);
        return Observable.empty();
      })
  );
}
