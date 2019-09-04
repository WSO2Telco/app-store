import { Component, OnInit } from '@angular/core';
import { CreateApplicationParam } from '../../applications.data.models';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'store-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  application:CreateApplicationParam = new CreateApplicationParam();
  

  constructor(private store: Store<AppState>, private titleService: Title) { }

  ngOnInit() {
    this.store.dispatch(new globalActions.SetBreadcrumbAction([new BreadcrumbItem("Applications")]));
    this.titleService.setTitle("Create New App | Apigate API Store");
  }

}
