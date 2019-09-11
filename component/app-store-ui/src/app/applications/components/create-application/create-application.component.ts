import { Component, OnInit } from '@angular/core';
import { CreateApplicationParam } from '../../applications.data.models';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'store-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  application:CreateApplicationParam = new CreateApplicationParam();
  quota = [
    { title : "Unlimited", value: 'unlimited' },
    { title : "50 Per Min", value: '50' },
    { title : "20 Per Min", value: '20' },
    { title : "10 Per Min", value: '10' },
  ];

  tokenType = [
    { title : "OAuth", value: 'oauth' },
    { title : "JWT", value: 'jwt' }
  ];
  formCreateApp: FormGroup;
  submitted = false;

  constructor(
    private store: Store<AppState>, 
    private titleService: Title,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.store.dispatch(new globalActions.SetBreadcrumbAction([new BreadcrumbItem("Applications")]));
    this.titleService.setTitle("Create New App | Apigate API Store");

    this.formCreateApp = this.fb.group({
      appName: ['', [Validators.required, Validators.maxLength(70),  Validators.pattern("[a-zA-Z\s]+$")]],
      appDescription: ['', Validators.required],
      appQuota: ['unlimited', Validators.required],
      appTokenType: ['oauth', Validators.required]
    });
  }

  get f() { return this.formCreateApp.controls;  }

  onSubmit() {
      this.submitted = true;
      if (this.formCreateApp.invalid) {
          return;
      }
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formCreateApp.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.formCreateApp.reset();
  }

}
