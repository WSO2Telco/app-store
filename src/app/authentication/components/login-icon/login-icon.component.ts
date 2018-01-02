import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginAction } from '../../authentication.models';

@Component({
  selector: 'store-login-icon',
  templateUrl: './login-icon.component.html',
  styleUrls: ['./login-icon.component.scss']
})
export class LoginIconComponent implements OnInit {

  @Output()
  private menuSelect: EventEmitter<LoginAction> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  private onMenuSelected(type: 'Login' | 'Help') {
    this.menuSelect.emit(new LoginAction(type));
  }

}
