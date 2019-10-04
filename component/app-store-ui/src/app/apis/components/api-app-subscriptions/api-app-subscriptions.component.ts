import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AppState } from '../../../app.data.models';
import { NotificationService } from "../../../shared/services/notification.service";
import { Subscription } from "../../../applications/applications.data.models";
import { GetUserApplicationsAction, GetUserSubscriptionsAction } from '../../apis.actions';

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
      .subscribe(res => {
        if(res && res.list) this.datasource.data = res.list
      });

    this.store
      .select(s => s.apis.selectedApi)
      .subscribe(app => {
        if (app) {
          this.store.dispatch(GetUserSubscriptionsAction({ "payload" : app.id}));
        }
      });
  }

  newSubscription() { }

}
