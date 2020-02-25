import { Component, OnInit } from '@angular/core';
import { CreateApplicationParam, ApplicationDetails } from '../../applications.data.models';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

import * as applicationActions from "../../../applications/applications.actions";
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'store-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  application: CreateApplicationParam = new CreateApplicationParam();
  appData: ApplicationDetails;
  formCreateApp: FormGroup;
  submitted = false;
  public appDescription: string;
  public appName: string;
  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private fb: FormBuilder,
    private actions$: Actions,
    private route: ActivatedRoute,
  ) {
    this.formCreateApp = this.fb.group({
      appName: ['', [Validators.required, Validators.maxLength(70)]],
      appDescription: ['']
    });

  }

  ngOnInit() {
    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("Applications")] }));
    this.titleService.setTitle("Create New App | Apigate API Store");

    this.route.params.subscribe(params => {
      let appId = params['appId'];
      if (appId != null) {
        this.store.dispatch(
          applicationActions.GetApplicationDetailsAction({ "payload": appId })
        );

        this.actions$.pipe(ofType(applicationActions.GetApplicationDetailsSuccessAction)).pipe(take(1)).subscribe(p => {
          if (p) {
            this.appData = p.payload
            this.formCreateApp.controls.appName.setValue(this.appData.name);
            this.formCreateApp.controls.appDescription.setValue(this.appData.description);
          }
        })
      }
    })
  }

  get f() { return this.formCreateApp.controls; }

  onSubmit(fData: any, formDirective: FormGroupDirective) {
    this.submitted = true;
    if (!this.formCreateApp.valid) {
      return;
    } else {
      this.application.name = this.formCreateApp.value.appName;
      this.application.description = this.formCreateApp.value.appDescription;

      if (!this.appData) {
        this.store.dispatch(applicationActions.CreateApplicationsAction({ "payload": this.application }))

        this.actions$.pipe(ofType(applicationActions.CreateApplicationSuccessAction)).subscribe(p => {
          this.submitted = false;
          formDirective.resetForm();
          this.formCreateApp.reset();
        })
      } else {
        this.store.dispatch(applicationActions.UpdateApplicationsAction({ "appId": this.appData.applicationId, "payload": this.application }))

        this.actions$.pipe(ofType(applicationActions.UpdateApplicationSuccessAction)).subscribe(p => {
          this.submitted = false;
          formDirective.resetForm();
          this.formCreateApp.reset();
        })
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.formCreateApp.reset();
  }

}
