import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoginMenuAction, LoginResponseData, LoginMenuActionTypes, LoginFormData } from './authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from './app.models';
import { DoLogoutAction } from './authentication/authentication.actions';
import { Observable } from 'rxjs/Observable';
import * as loginActions from './authentication/authentication.actions';
import * as globalActions from './app.actions';

@Component({
  selector: 'store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public opened: boolean;
  public rightNavOpened: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.opened = true;
    }, 100);

    this.store.select(store => store.global.layout.rightNavOpened)
      .subscribe(val => { this.rightNavOpened = val; });

    this.store.select(store => store.authentication.loginData)
      .subscribe((loginData) => {
        if (loginData) {
          this.store.dispatch(new globalActions.ToggleRightPanelAction(false));
        }
      });
  }

  private onMenuSelect(event: LoginMenuAction) {
    switch (event.type) {
      case LoginMenuActionTypes.LOGIN: {
        this.store.dispatch(new globalActions.ToggleRightPanelAction(true));
        break;
      }

      case LoginMenuActionTypes.LOGOUT: {
        this.store.dispatch(new DoLogoutAction());
        break;
      }

      default:
        break;
    }

  }

  onLoginClick(loginData: LoginFormData) {
    this.store.dispatch(new loginActions.DoLoginAction(loginData));
  }

  onRightNavClose() {
    this.store.dispatch(new globalActions.ToggleRightPanelAction(false));
  }
}
