import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginMenuAction, LoginMenuActionTypes } from './authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from './app.data.models';
import { DoLogoutAction, TokenRefreshAction, DoLogoutSuccessAction } from './authentication/authentication.actions';
import * as globalActions from './app.actions';
import { ToggleLeftPanelAction } from './app.actions';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

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

  idleState = 'Not started.';
  timedOut = false;

  constructor(
    private store: Store<AppState>,
    private ref: ChangeDetectorRef,
    private router: Router,
    private actions: Actions,
    private idle: Idle
  ) {
    // sets an idle timeout of 3min
    idle.setIdle(180);
    // sets a timeout period of 0.5 min. after 150 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(30);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    this.reset();
  }

  ngOnInit(): void {

    this.store.select(store => store.global.layout.rightNavOpened)
      .subscribe(val => this.rightNavOpened = val);

    this.store.select((s) => s.global.layout.appTheme).subscribe((theme) => this.selectedTheme = theme);
    this.store.select((s) => s.global.layout.menuBackImage).subscribe((flag) => this.menuBackImage = flag);
    this.store.select(store => store.global.layout.leftNavOpened)
      .subscribe(val => {
        this.leftNavOpened = val;
        this.ref.detectChanges();
      });

    this.store.select(store => store.authentication.loginData)
      .subscribe((loginData) => {
        if (loginData) {
          this.store.dispatch(globalActions.ToggleRightPanelAction({ "payload": false }));
        }
      });

    setTimeout(() => {
      this.store.dispatch(ToggleLeftPanelAction({ "payload": true }));
    }, 200);

    let authtkn = localStorage.getItem('tkx')

    this.actions.pipe(ofType(DoLogoutSuccessAction)).subscribe(p => {
      location.replace("/app-store");
    })

    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let authData = localStorage.getItem('authentication');
        if (authData == undefined || authData == null) {
          this.store.dispatch(DoLogoutAction());
          if (localStorage.getItem("autologout") == "false") {
         //   sessionStorage.setItem("autologout", "true");
          }
          return;
        }
        return;
      }
    }, false);
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  onMenuSelect(event: LoginMenuAction) {
    switch (event.type) {
      case LoginMenuActionTypes.LOGIN: {
        this.store.dispatch(globalActions.ToggleRightPanelAction({ "payload": true }));
        break;
      }

      case LoginMenuActionTypes.LOGOUT: {
        this.store.dispatch(DoLogoutAction());
        sessionStorage.removeItem("autologout");
        break;
      }

      case LoginMenuActionTypes.SIGNUP: {
        this.router.navigate(['home/signup']);
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
    this.store.dispatch(globalActions.ToggleRightPanelAction({ "payload": false }));
  }

  onHambergerMenuClick(event) {
    this.store.dispatch(globalActions.ToggleLeftPanelAction({ "payload": event }));
  }
}
