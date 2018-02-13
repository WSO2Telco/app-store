import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginMenuAction, LoginResponseData, LoginMenuActionTypes, LoginFormData } from './authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from './app.models';
import { DoLogoutAction } from './authentication/authentication.actions';
import { Observable } from 'rxjs/Observable';
import * as loginActions from './authentication/authentication.actions';
import * as globalActions from './app.actions';
import { ToggleLeftPanelAction } from './app.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public leftNavOpened: boolean;
  public rightNavOpened: boolean;
  public selectedTheme: string;

  constructor(
    private store: Store<AppState>,
    private ref: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {

    this.store.select(store => store.global.layout.rightNavOpened)
      .subscribe(val => this.rightNavOpened = val);

    this.store.select((s) => s.global.layout.appTheme).subscribe((theme) => this.selectedTheme = theme);
    
    this.store.select(store => store.global.layout.leftNavOpened)
      .subscribe(val => {
        this.leftNavOpened = val;
        this.ref.detectChanges();
      });

    this.store.select(store => store.authentication.loginData)
      .subscribe((loginData) => {
        if (loginData) {
          this.store.dispatch(new globalActions.ToggleRightPanelAction(false));
        }
      });

    setTimeout(() => {
      this.store.dispatch(new ToggleLeftPanelAction(true));
    }, 200);

  }

  onMenuSelect(event: LoginMenuAction) {
    switch (event.type) {
      case LoginMenuActionTypes.LOGIN: {
        this.store.dispatch(new globalActions.ToggleRightPanelAction(true));
        break;
      }

      case LoginMenuActionTypes.LOGOUT: {
        this.store.dispatch(new DoLogoutAction());
        break;
      }

      case LoginMenuActionTypes.SIGNUP: {
        this.router.navigate(['application/sign-up']);
        break;
      }

      case LoginMenuActionTypes.MYACCOUNT: {
        this.router.navigate(['application/my-account']);
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

  onHambergerMenuClick(event) {
    this.store.dispatch(new globalActions.ToggleLeftPanelAction(event));
  }
}
