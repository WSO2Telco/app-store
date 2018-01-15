import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Country, Operator, Tier } from '../../../app.models';
import { ToggleLeftPanelAction, LoadCountriesAction, LoadOperatorsAction, LoadTiersAction } from '../../../app.actions';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Application, SubscribeParam } from '../../apis.models';
import {
  GetUserApplicationsAction, AddOperatorToSelectionAction,
  RemoveOperatorFromSelectionAction, RemoveAllOperatorFromSelectionAction, DoSubscribeAction
} from '../../apis.actions';

@Component({
  selector: 'store-api-subscription',
  templateUrl: './api-subscription.component.html',
  styleUrls: ['./api-subscription.component.scss'],
})
export class ApiSubscriptionComponent implements OnInit {

  public countries$: Observable<Country[]>;
  public operators$: Observable<Operator[]>;
  public applications$: Observable<Application[]>;
  public selectedOperators: Operator[];
  public tiers$: Observable<Tier[]>;

  public countryControl = new FormControl();
  public selectedCountry: Country;
  public selectedOperator: Operator;
  public selectedApplication: Application;
  public selectedTier: Tier;

  constructor(private store: Store<AppState>) {
    this.countries$ = this.store.select((s: AppState) => s.global.mccAndmnc.countries);
    this.operators$ = this.store.select((s: AppState) => s.global.mccAndmnc.operators);
    this.tiers$ = this.store.select((s: AppState) => s.global.mccAndmnc.tiers);
    this.applications$ = this.store.select((s: AppState) => s.apis.userApplications);
    this.store.select((s: AppState) => s.apis.selectedOperators)
      .subscribe((res) => this.selectedOperators = res);
  }

  ngOnInit() {
    this.store.dispatch(new LoadCountriesAction());
    this.store.dispatch(new GetUserApplicationsAction());
    this.store.dispatch(new LoadTiersAction());
  }

  onCountryChange() {
    this.store.dispatch(new LoadOperatorsAction(this.selectedCountry));
    this.store.dispatch(new RemoveAllOperatorFromSelectionAction());
  }

  onOperatorChange() {
    this.store.dispatch(new AddOperatorToSelectionAction(this.selectedOperator));
    this.selectedOperator = null;
  }

  onOperatorRemove(op: Operator) {
    this.store.dispatch(new RemoveOperatorFromSelectionAction(op));
  }

  onSubscribeClick($form) {
    if ($form.valid) {
      this.store.dispatch(new DoSubscribeAction(
        new SubscribeParam(this.selectedCountry, this.selectedOperators, this.selectedApplication, this.selectedTier)));
    }
  }
}
