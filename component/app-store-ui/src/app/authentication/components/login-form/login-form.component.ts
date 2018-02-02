import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginFormData, LoginResponseData } from '../../authentication.models';
@Component({
  selector: 'store-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  public username: string;
  public password: string;

  @Output()
  public loginClick: EventEmitter<LoginFormData> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onLoginClick() {
    this.loginClick.emit(new LoginFormData(this.username, this.password));
  }
}
