import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.models';
import { AppThemeChangeAction } from '../../../app.actions';

@Component({
  selector: 'store-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public selectedTheme: string;
  public allThemes = [
    {
      name: 'Default Theme',
      className: 'theme-one-light',
      primary: '#42A5F5',
      accent: '#E91E63',
      warn: '#F44336'
    },
    {
      name: 'Forest Theme',
      className: 'theme-two-light',
      primary: '#00BCD4',
      accent: '#FFA726',
      warn: '#D50000'
    },
    {
      name: 'Pinky in Gray Theme',
      className: 'theme-three-light',
      primary: '#37474F',
      accent: '#F06292',
      warn: '#FF1744'
    }
  ];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select((s) => s.global.layout.appTheme).subscribe((theme) => this.selectedTheme = theme);
  }

  onChange(e) {
    this.store.dispatch(new AppThemeChangeAction(e.value));
  }

}
