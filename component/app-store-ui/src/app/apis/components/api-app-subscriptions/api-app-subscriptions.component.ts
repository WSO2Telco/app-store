import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AppState } from '../../../app.data.models';
import { NotificationService } from "../../../shared/services/notification.service";
import { Subscription } from "../../../applications/applications.data.models";
import { GetUserApplicationsAction } from '../../apis.actions';

@Component({
  selector: 'store-api-app-subscriptions',
  templateUrl: './api-app-subscriptions.component.html',
  styleUrls: ['./api-app-subscriptions.component.scss']
})
export class ApiAppSubscriptionsComponent implements OnInit {
  public datasource: MatTableDataSource<Subscription> = new MatTableDataSource();

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.store
      .select(s => s.applications.appSubscriptions)
      .subscribe(res => (this.datasource.data = res));

    this.store
      .select(s => s.apis.selectedApi)
      .subscribe(app => {
        console.log(app.id);
        if (app) {
          // this.store.dispatch(GetUserApplicationsAction({ "payload" : app.id}));
        }
      });
  }

  newSubscription() { }

}
