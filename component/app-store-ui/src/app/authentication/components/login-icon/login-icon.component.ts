import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginMenuAction, IMenuItem, LoginMenuActionTypes } from '../../authentication.models';
import { AppState } from '../../../app.models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'store-login-icon',
  templateUrl: './login-icon.component.html',
  styleUrls: ['./login-icon.component.scss']
})
export class LoginIconComponent implements OnInit {

  @Output()
  private menuSelect: EventEmitter<LoginMenuAction> = new EventEmitter();

  public menu$: Observable<IMenuItem[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.menu$ = this.store.select(state => state.authentication.menuData);
  }

  private onMenuSelected(type: LoginMenuActionTypes) {
    this.menuSelect.emit(new LoginMenuAction(type));
  }

}
