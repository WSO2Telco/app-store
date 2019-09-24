import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material';
import { Application, GetApplicationsParam } from '../../applications.data.models';
import * as applicationsActions from '../../applications.actions';
import * as authActions from '../../../authentication/authentication.actions'
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

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
  searchQuery: string = '';
  public clientData: ClientRegParam;
  length: number;
  pageSize: number = 5;

  constructor(private store: Store<AppState>, private router: Router, private titleService: Title, private actions$: Actions, ) { }

  ngOnInit() {
    this.clientData = new ClientRegParam();

    /* this.actions$.pipe(ofType(authActions.TokenGenerationSuccessAction)).subscribe(p => {
      this.store.dispatch(applicationsActions.GetAllApplicationsAction({ "payload": new GetApplicationsParam(0, 5, 0, '') }))
    }) */

    this.store.select((s) => s.authentication.tokenDetails).subscribe((auth) => {
      if (auth) {
        this.store.dispatch(applicationsActions.GetAllApplicationsAction({ "payload": new GetApplicationsParam(0, 5, 0, '') }))
      }
    })

    this.actions$.pipe(ofType(applicationsActions.GetAllApplicationsSuccessAction)).subscribe(p => {
      if (p) {
        this.store
          .select(s => s.applications.allApplications)
          .subscribe(apps => this.dataSource.data = apps.list);
      }
    })

    /* this.store
      .select(s => s.applications.allApplications)
      .subscribe((apps) => {
        this.dataSource.data = apps.list
      }); */

    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("Applications")] }));
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

  onSearchClick() {
    this.store.dispatch(applicationsActions.GetAllApplicationsAction({ "payload": new GetApplicationsParam(0, this.pageSize, 0, this.searchQuery) }))
  }

  onPageChanged(e) {
    let offset = e.pageSize * e.pageIndex;
    this.pageSize = e.pageSize;
    this.store.dispatch(applicationsActions.GetAllApplicationsAction({ "payload": new GetApplicationsParam(0, this.pageSize, offset, this.searchQuery) }))
  }
}