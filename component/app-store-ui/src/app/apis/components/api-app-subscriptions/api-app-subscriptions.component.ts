import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AppState } from '../../../app.data.models';
import { NotificationService } from "../../../shared/services/notification.service";
import { Subscription, GetApplicationsParam } from "../../../applications/applications.data.models";
import { GetUserSubscriptionsAction, DoNewSubscribeAction, DoNewSubscribeSuccessAction, UnsubscribeAction, UnsubscribeSuccessAction } from '../../apis.actions';
import { ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { ActionDialogComponent } from '../../../commons/components/action-dialog/action-dialog.component';
import { AddNewSubsParam } from '../../apis.models';
import { ConfirmDialogComponent } from '../../../commons/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'store-api-app-subscriptions',
  templateUrl: './api-app-subscriptions.component.html',
  styleUrls: ['./api-app-subscriptions.component.scss']
})
export class ApiAppSubscriptionsComponent implements OnInit {
  public datasource: MatTableDataSource<Subscription> = new MatTableDataSource();
  api_id: string;
  appResult;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private actions$: Actions
  ) { }

  ngOnInit() {

    this.route.params.subscribe(p => {
      this.api_id = p['apiId'];
    })
    this.store
      .select(s => s.apis.apiSubscriptions)
      .subscribe(res => {
        if (res && res.list) this.datasource.data = res.list
      });

    this.store
      .select(s => s.apis.selectedApi)
      .subscribe(app => {
        if (app) {
          this.store.dispatch(GetUserSubscriptionsAction({ "payload": this.api_id }));
        }
      });

    this.store
      .select(s => s.apis.availableApp)
      .subscribe(apps => {
        this.appResult = apps.list;

      });

  }

  openDialog(event: any) {
    var mapResult = this.appResult.map(appArr => ({ value: appArr.applicationId, viewValue: appArr.name }));
    event.stopPropagation();
    const dialogRef = this.dialog.open(ActionDialogComponent, {
      width: '380px',
      data: {
        appList: mapResult,
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(DoNewSubscribeAction({ "payload": new AddNewSubsParam('Unlimited', this.api_id, result) }));

        this.actions$.pipe(ofType(DoNewSubscribeSuccessAction)).subscribe(p => {
          if (p) {
            this.store.dispatch(GetUserSubscriptionsAction({ "payload": this.api_id }));
          }
        })
      }
    }
    );
  }


  //unsubscribe
  onAction(sub, action) {
    if (action === "unsubscribe") {
      const ref = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: "Confirm Unsubscribe",
          message:
            'Are you sure you want to unsubscribe the subscription id "' +
            sub.subscriptionId + '"?'
        }
      });

      ref.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.store.dispatch(UnsubscribeAction({ subscriptionId: sub.subscriptionId }));
          this.notification.success("Successfully unsubscribe the Subscription");


          this.actions$.pipe(ofType(UnsubscribeSuccessAction)).subscribe(p => {
            this.store.dispatch(GetUserSubscriptionsAction({ "payload": this.api_id }));
          })
        }
      });
    }
  }


}
