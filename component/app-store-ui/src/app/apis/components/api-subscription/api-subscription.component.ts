import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AppState, Country, Operator, Tier } from '../../../app.models';
import { ToggleLeftPanelAction, LoadCountriesAction, LoadOperatorsAction } from '../../../app.actions';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Application, SubscribeParam } from '../../apis.models';
import {
  GetUserApplicationsAction, AddOperatorToSelectionAction,
  RemoveOperatorFromSelectionAction, RemoveAllOperatorFromSelectionAction, DoSubscribeAction, DO_SUBSCRIBE_SUCCESS
} from '../../apis.actions';

@Component({
  selector: 'store-api-subscription',
  templateUrl: './api-subscription.component.html',
  styleUrls: ['./api-subscription.component.scss'],
})
export class ApiSubscriptionComponent implements OnInit {

  @ViewChild(NgForm) subForm: NgForm;

  public countries$: Observable<Country[]>;
  public operators$: Observable<Operator[]>;
  public applications$: Observable<Application[]>;
  public selectedOperators: Operator[];
  public tiers: string[];

  public countryControl = new FormControl();
  public selectedCountry: Country;
  public selectedOperator: Operator;
  public selectedApplication: Application;
  public selectedTier: Tier;

  constructor(private store: Store<AppState>, private actions: Actions) {
    this.countries$ = this.store.select((s: AppState) => s.global.mccAndmnc.countries);
    this.operators$ = this.store.select((s: AppState) => s.global.mccAndmnc.operators);
    this.applications$ = this.store.select((s: AppState) => s.apis.userApplications);

    this.store.select((s: AppState) => s.apis.selectedOperators)
      .subscribe((res) => this.selectedOperators = res);

    this.store.select((s: AppState) => s.apis.selectedApi.tiers)
      .subscribe((t) => { this.tiers = t; });

    this.actions
      .ofType(DO_SUBSCRIBE_SUCCESS)
      .subscribe(() => { this.resetForm(); });
  }

  ngOnInit() {
    this.store.dispatch(new LoadCountriesAction());
    this.store.dispatch(new GetUserApplicationsAction());
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

  private resetForm() {
    this.subForm.resetForm();
    this.selectedApplication = null;
    this.selectedCountry = null;
    this.selectedOperator = null;
    this.selectedTier = null;
    this.store.dispatch(new RemoveAllOperatorFromSelectionAction());
  }
}
