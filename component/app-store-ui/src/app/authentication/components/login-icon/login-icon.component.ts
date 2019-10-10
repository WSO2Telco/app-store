import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginMenuAction, IMenuItem, LoginMenuActionTypes } from '../../authentication.models';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'store-login-icon',
  templateUrl: './login-icon.component.html',
  styleUrls: ['./login-icon.component.scss']
})
export class LoginIconComponent implements OnInit {

  @Output()
  private menuSelect: EventEmitter<LoginMenuAction> = new EventEmitter();

  public menu$: Observable<IMenuItem[]>;
  public username:string = null;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.menu$ = this.store.select(state => state.authentication.menuData);

    this.store.select((s) => s.authentication.loggedUser).subscribe((user) => {
      this.username = user;
    })
  }

  private onMenuSelected(type: LoginMenuActionTypes) {
    this.menuSelect.emit(new LoginMenuAction(type));
  }

}
