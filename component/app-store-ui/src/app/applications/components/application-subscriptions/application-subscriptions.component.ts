import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from '../../applications.data.models';
import * as applicationsActions from '../../applications.actions';

@Component({
  selector: 'store-application-subscriptions',
  templateUrl: './application-subscriptions.component.html',
  styleUrls: ['./application-subscriptions.component.scss']
})
export class ApplicationSubscriptionsComponent implements OnInit {
  public datasource: MatTableDataSource<
    Subscription
  > = new MatTableDataSource();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(s => s.applications.appSubscriptions)
      .subscribe(res => (this.datasource.data = res));

    this.store
      .select(s => s.applications.selectedApplication)
      .subscribe(app => {
        if (app) {
          this.store.dispatch(
            new applicationsActions.GetApplicationSubscriptionsAction(app)
          );
        }
      });
  }


  onAction(sub, actions) {

  }
}
