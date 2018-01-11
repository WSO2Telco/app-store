import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Country } from '../../../app.models';
import { ToggleLeftPanelAction, LoadCountriesAction } from '../../../app.actions';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'store-api-subscription',
  templateUrl: './api-subscription.component.html',
  styleUrls: ['./api-subscription.component.scss'],
})
export class ApiSubscriptionComponent implements OnInit {

  public countries$: Observable<Country[]>;
  public countryControl = new FormControl();

  constructor(private store: Store<AppState>) {
    this.countries$ = this.store.select((s: AppState) => s.global.mccAndmnc.countries);
  }

  ngOnInit() {
    this.store.dispatch(new LoadCountriesAction());
  }

  onToggle() {
    this.store.dispatch(new ToggleLeftPanelAction());
  }
}
