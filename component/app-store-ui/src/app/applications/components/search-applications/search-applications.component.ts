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

@Component({
  selector: 'store-search-applications',
  templateUrl: './search-applications.component.html',
  styleUrls: ['./search-applications.component.scss']
})
export class SearchApplicationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Application>();
  searchQuery:string;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store
      .select(s => s.applications.allApplications)
      .subscribe(apps => (this.dataSource.data = apps));

    this.store.dispatch(new applicationsActions.GetAllApplicationsAction());

    this.store.dispatch(new globalActions.SetBreadcrumbAction([new BreadcrumbItem("Applications")]));
  }

  onAppAction(app, action) {
    switch (action) {
      case 'view': {
        this.router.navigate([`applications/${app.id}/overview`]);
        break;
      }

      default:
        break;
    }
  }

  onSearchClick(){}
}
