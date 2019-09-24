import { Component, OnInit } from '@angular/core';
import { CreateApplicationParam } from '../../applications.data.models';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as applicationActions from "../../../applications/applications.actions";

@Component({
  selector: 'store-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  application: CreateApplicationParam = new CreateApplicationParam();

  formCreateApp: FormGroup;
  submitted = false;
  public appDescription: string;
  public appName: string;

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.store.dispatch(globalActions.SetBreadcrumbAction({payload:[new BreadcrumbItem("Applications")]}));
    this.titleService.setTitle("Create New App | Apigate API Store");

    this.formCreateApp = this.fb.group({
      appName: ['', [Validators.required, Validators.maxLength(70), Validators.pattern("[a-zA-Z\s]+$")]],
      appDescription: ['', Validators.required]
    });


  }

  get f() { return this.formCreateApp.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formCreateApp.invalid) {
      return;
    } else {
     this.application.name = this.appName;
     this.application.description = this.appDescription; 
     this.store.dispatch(applicationActions.CreateApplicationsAction({"payload" :this.application}))
    } 
  }

  onReset() {
    this.submitted = false;
    this.formCreateApp.reset();
  }

}
