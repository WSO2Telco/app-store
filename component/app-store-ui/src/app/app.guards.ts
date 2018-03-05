import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "./authentication/authentication.service";
import { Store } from "@ngrx/store";
import { ToggleRightPanelAction } from "./app.actions";
import { AppState } from "./app.data.models";
import * as authActions from "./authentication/authentication.actions";

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenticationService,
    private store: Store<AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (this._authenticationService.isLoggedIn()) {
      this.store.dispatch(new ToggleRightPanelAction(false));
      return true;
    } else {
      this.store.dispatch(
        new authActions.SetLastAuthRequiredRouteAction(route.routeConfig.path)
      );
      this.store.dispatch(new ToggleRightPanelAction(true));
      return false;
    }
  }
}
