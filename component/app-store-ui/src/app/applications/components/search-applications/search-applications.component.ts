import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material';
import { Application } from '../../applications.data.models';
import * as applicationsActions from '../../applications.actions';
import { Router } from '@angular/router';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { ClientRegParam } from '../../../authentication/authentication.models';
@Component({
  selector: 'store-search-applications',
  templateUrl: './search-applications.component.html',
  styleUrls: ['./search-applications.component.scss']
})
export class SearchApplicationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Application>();
  searchQuery: string;
  public clientData: ClientRegParam;

  constructor(private store: Store<AppState>, private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.clientData = new ClientRegParam();
    this.store
      .select(s => s.applications.allApplications)
      .subscribe(apps => (this.dataSource.data = apps.list));

 //   this.store.dispatch(new applicationsActions.ClientRegistrationAction(this.clientData));

    this.store.dispatch(applicationsActions.GetAllApplicationsAction({"payload":0}));

    this.store.dispatch(new globalActions.SetBreadcrumbAction([new BreadcrumbItem("Applications")]));
    this.titleService.setTitle("Apps | Apigate API Store");
  }

  onAppAction(app, action) {
    switch (action) {
      case 'view': {
        this.router.navigate([`applications/${app.applicationId}/overview`]);
        break;
      }

      default:
        break;
    }
  }

  onSearchClick() { }
}
