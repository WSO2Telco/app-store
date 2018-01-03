import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../authentication.reducers';
import * as actions from '../../authentication.actions';
import { LoginFormData } from '../../authentication.models';
@Component({
  selector: 'store-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public username: string;
  public password: string;


  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
  }

  onLoginClick() {
    this.store.dispatch(new actions.DoLoginAction(new LoginFormData(this.username, this.password)));
  }
}
