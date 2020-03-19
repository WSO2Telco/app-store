import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import { LoginFormData, ForgetPasswordParam } from '../../authentication.models';
import { AppState } from '../../../app.data.models';
import { DoLoginAction, ClientRegistrationAction, ClientRegistrationSuccessAction, TokenGenerationAction, SetLoggedUserAction, LoginSuccessAction, LoginFailedAction, ForgetPwAction, ForgetPwSuccessAction } from '../../authentication.actions';

@Component({
  selector: 'store-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  public username: string;
  public password: string;
  public loginForm: FormGroup;
  public fpwForm: FormGroup;
  public loginError: string;
  public FpwError: string;
  public forgotPwShow = false;

  @Output()
  public loginClick: EventEmitter<LoginFormData> = new EventEmitter();

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private actions: Actions,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
    this.fpwForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.actions$.pipe(ofType(ClientRegistrationSuccessAction)).pipe(take(1)).subscribe(p => {
      this.store.dispatch(TokenGenerationAction({ "payload": new LoginFormData(this.username, this.password) }));
      this.store.dispatch(SetLoggedUserAction({ "payload": this.username }));
      localStorage.setItem("loggedUser", this.username);
    })

    this.actions$.pipe(ofType(LoginSuccessAction)).pipe(take(1)).subscribe(l => {
      this.store.dispatch(ClientRegistrationAction({ "payload": new LoginFormData(this.username, this.password) }));
    })

    this.actions$.pipe(ofType(LoginFailedAction)).subscribe(msg => {
      this.loginError = msg.payload;
      this.cd.detectChanges();
    })
  }

  get f() { return this.loginForm.controls; }

  switchForgotPw(action){
    this.forgotPwShow = action;
  }

  onLoginClick() {
    this.loginError = null;

    if (this.loginForm.valid) {
      this.username = this.loginForm.get('username').value;
      this.password = this.loginForm.get('password').value;

      this.store.dispatch(DoLoginAction({ "payload": new LoginFormData(this.username, this.password) }));
    }

  }


  onfpwLoginClick(form:any, formDirective: FormGroupDirective) {

    if (this.fpwForm.valid) {
      this.username = this.fpwForm.value.username;

      this.store.dispatch(ForgetPwAction({ "payload": new ForgetPasswordParam(this.username) }));

      this.actions.pipe(ofType(ForgetPwSuccessAction)).subscribe(p => {
        formDirective.resetForm();
        this.fpwForm.reset();
      })
    }

  }
}
