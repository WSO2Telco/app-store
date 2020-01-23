import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginMenuAction, LoginMenuActionTypes } from './authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from './app.data.models';
import { DoLogoutAction, TokenRefreshAction } from './authentication/authentication.actions';
import * as globalActions from './app.actions';
import { ToggleLeftPanelAction} from './app.actions';
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
  public particleAnimation: boolean;
  public menuBackImage: boolean;

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
          this.store.dispatch(globalActions.ToggleRightPanelAction({"payload": false}));
        }
      });

    setTimeout(() => {
      this.store.dispatch(ToggleLeftPanelAction({"payload": true}));
    }, 200);

    let rtkn = localStorage.getItem('rtkn');
    if(rtkn) this.store.dispatch(TokenRefreshAction());
  }

  onMenuSelect(event: LoginMenuAction) {
    switch (event.type) {
      case LoginMenuActionTypes.LOGIN: {
        this.store.dispatch(globalActions.ToggleRightPanelAction({"payload": true}));
        break;
      }

      case LoginMenuActionTypes.LOGOUT: {
        this.store.dispatch(DoLogoutAction());
        break;
      }

      case LoginMenuActionTypes.SIGNUP: {
        this.router.navigate(['application/sign-up']);
        break;
      }
      case LoginMenuActionTypes.HELP: {
        this.router.navigate(['application/help']);
        break;
      }

      case LoginMenuActionTypes.THEME: {
        this.router.navigate(['home/theme']);
        break;
      }

      case LoginMenuActionTypes.MYACCOUNT: {
        this.router.navigate(['application/my-account']);
        break;
      }
    }

  }

  onRightNavClose() {
    this.store.dispatch(globalActions.ToggleRightPanelAction({"payload": false}));
  }

  onHambergerMenuClick(event) {
    this.store.dispatch(globalActions.ToggleLeftPanelAction({"payload": event}));
  }
}
