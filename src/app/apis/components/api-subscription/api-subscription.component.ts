import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Country, Operator } from '../../../app.models';
import { ToggleLeftPanelAction, LoadCountriesAction, LoadOperatorsAction } from '../../../app.actions';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Application } from '../../apis.models';
import { GetUserApplicationsAction } from '../../apis.actions';

@Component({
  selector: 'store-api-subscription',
  templateUrl: './api-subscription.component.html',
  styleUrls: ['./api-subscription.component.scss'],
})
export class ApiSubscriptionComponent implements OnInit {

  public countries$: Observable<Country[]>;
  public operators$: Observable<Operator[]>;
  public applications$: Observable<Application[]>;

  public countryControl = new FormControl();
  public selectedCountry: Country;

  constructor(private store: Store<AppState>) {
    this.countries$ = this.store.select((s: AppState) => s.global.mccAndmnc.countries);
    this.operators$ = this.store.select((s: AppState) => s.global.mccAndmnc.operators);
    this.applications$ = this.store.select((s: AppState) => s.apis.userApplications);
  }

  ngOnInit() {
    this.store.dispatch(new LoadCountriesAction());
    this.store.dispatch(new GetUserApplicationsAction());
  }

  onCountryChange() {
    this.store.dispatch(new LoadOperatorsAction(this.selectedCountry));
  }

}
