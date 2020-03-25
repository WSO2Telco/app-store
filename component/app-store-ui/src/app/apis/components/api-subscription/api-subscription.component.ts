import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AppState, Country, Operator, Tier } from '../../../app.data.models';
import { ToggleLeftPanelAction, LoadCountriesAction, LoadOperatorsAction } from '../../../app.actions';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Application, SubscribeParam } from '../../apis.models';
import { GetUserApplicationsAction, AddOperatorToSelectionAction, RemoveOperatorFromSelectionAction, RemoveAllOperatorFromSelectionAction, DoSubscribeAction } from '../../apis.actions';
import { ConfirmDialogComponent } from '../../../commons/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'store-api-subscription',
  templateUrl: './api-subscription.component.html',
  styleUrls: ['./api-subscription.component.scss'],
})
export class ApiSubscriptionComponent implements OnInit {

  @ViewChild(NgForm, { static: true }) subForm: NgForm;

  public countries$: Observable<Country[]>;
  public operators$: Observable<Operator[]>;
  public applications$: Observable<Application[]>;
  public selectedOperators: Operator[];
  public tiers: Tier[];

  public countryControl = new FormControl();
  public selectedCountry: Country;
  public selectedOperator: Operator;
  public selectedApplication: Application;
  public selectedTier: Tier;

  constructor(private store: Store<AppState>, private actions: Actions, private dialog: MatDialog) {
    this.countries$ = this.store.select((s: AppState) => s.global.mccAndmnc.countries);
    this.operators$ = this.store.select((s: AppState) => s.global.mccAndmnc.operators);
    this.applications$ = this.store.select((s: AppState) => s.apis.userApplications);

    this.store.select((s: AppState) => s.apis.selectedOperators)
      .subscribe((res) => this.selectedOperators = res);

    this.store.select((s: AppState) => s.apis.selectedApi.tiers)
      .subscribe((t) => { this.tiers = t; });

    // this.actions
    //   .ofType(DO_SUBSCRIBE_SUCCESS)
    //   .subscribe(() => { this.resetForm(); });
  }

  ngOnInit() {

    this.store.dispatch(LoadCountriesAction());
    this.store.dispatch(GetUserApplicationsAction({payload : null}));
  }

  onCountryChange() {
    this.store.dispatch(LoadOperatorsAction({ payload: this.selectedCountry }));
    this.store.dispatch(RemoveAllOperatorFromSelectionAction({payload : null}));
  }

  onOperatorChange() {
    this.store.dispatch(AddOperatorToSelectionAction({ "payload": this.selectedOperator }));
    this.selectedOperator = null;
  }

  onOperatorRemove(op: Operator) {
    this.store.dispatch(RemoveOperatorFromSelectionAction({ "payload": op }));
  }

  openDialog(app, event: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        /* this.store.dispatch(applicationsActions.DeleteApplicationsAction({ "appId": app.applicationId }))

        this.actions$.pipe(ofType(applicationsActions.DeleteApplicationSuccessAction)).subscribe(p => {
          this.store.dispatch(applicationsActions.GetAllApplicationsAction({ "payload": new GetApplicationsParam(0, 10, 0, '') }))
        }) */
      }
    });
  }

  onSubscribeClick($form) {
    if ($form.valid) {
      this.store.dispatch(DoSubscribeAction(
        { "payload": new SubscribeParam(this.selectedCountry, this.selectedOperators, this.selectedApplication, this.selectedTier) }
      ));
    }
  }

  private resetForm() {
    this.subForm.resetForm();
    this.selectedApplication = null;
    this.selectedCountry = null;
    this.selectedOperator = null;
    this.selectedTier = null;
    this.store.dispatch(RemoveAllOperatorFromSelectionAction({payload : null}));
  }
}
