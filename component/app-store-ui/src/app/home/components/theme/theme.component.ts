import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreadcrumbItem,AppState, ThemeData } from '../../../app.data.models';
import { AppThemeChangeAction } from '../../../app.actions';
import { Actions, ofType } from '@ngrx/effects';

//Breadcrumbs
import * as globalActions from "../../../app.actions";

@Component({
  selector: 'store-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public selectedTheme: string = 'none';
  public particleAnimation: boolean;
  public meunBackImage: boolean;
  public username: string = null;

  public allThemes = [
    {
      name: 'Default Theme',
      className: 'theme-one-light',
      primary: '#42A5F5',
      accent: '#E91E63',
      warn: '#F44336'
    },
    {
      name: 'Apigate Green',
      className: 'theme-apigate-green',
      primary: '#2BB673',
      accent: '#231F20',
      warn: '#F44336'
    },
    {
      name: 'Apigate Blue',
      className: 'theme-apigate-blue',
      primary: '#231F20',
      accent: '#00AEEF',
      warn: '#F44336'
    },
  ];

  constructor(private store: Store<AppState>, private actions$: Actions) { }

  ngOnInit() {
    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("Theme")] }));
    this.store.select((s) => s.global.layout.appTheme).subscribe((theme) => this.selectedTheme = theme);

    this.store.select((s) => s.authentication.loggedUser).subscribe((user) => {
      this.username = user;
    })

    this.store.select((s) => s.global.layout.menuBackImage).subscribe((flag) => this.meunBackImage = flag);

  }

  onChange(e) {
    this.store.dispatch(AppThemeChangeAction({ payload: new ThemeData(this.username, e.value + '_' + this.meunBackImage) }));
  }

  onBackgroundToggle(e) {
    this.store.dispatch(AppThemeChangeAction({ payload: new ThemeData(this.username, this.selectedTheme + '_' + e.checked) }));
  }

}
