import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { LoginFormData } from '../../authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { DoLoginAction, ClientRegistrationAction, ClientRegistrationSuccessAction, TokenGenerationAction, SetLoggedUserAction, LoginSuccessAction, LoginFailedAction } from '../../authentication.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public loginError: string;

  @Output()
  public loginClick: EventEmitter<LoginFormData> = new EventEmitter();

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private fb : FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(8)]],
    });
  }

  ngOnInit() {
    this.actions$.pipe(ofType(ClientRegistrationSuccessAction)).pipe(take(1)).subscribe(p => {
      this.store.dispatch(TokenGenerationAction({ "payload": new LoginFormData(this.username, this.password) }));
      this.store.dispatch(SetLoggedUserAction({"payload": this.username}))
    })

    this.actions$.pipe(ofType(LoginSuccessAction)).pipe(take(1)).subscribe(l => {
      this.store.dispatch(ClientRegistrationAction({"payload": new LoginFormData(this.username, this.password) }));
    })

    this.actions$.pipe(ofType(LoginFailedAction)).subscribe(msg => {
      this.loginError = msg.payload;
      this.cd.detectChanges();
    })
  }

  get f() { return this.loginForm.controls; }

  onLoginClick() {
    this.loginError = null;
    
    if(this.loginForm.valid) {
      this.username = this.loginForm.get('username').value;
      this.password = this.loginForm.get('password').value;

      this.store.dispatch(DoLoginAction({"payload": new LoginFormData(this.username, this.password) }));
    }
  
  }
}
