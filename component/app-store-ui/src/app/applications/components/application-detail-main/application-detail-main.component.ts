import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { MatTableDataSource, MatDialog } from "@angular/material";
import { Store } from '@ngrx/store';

import { TabTile } from "../../applications.data.models";
import { AppState } from '../../../app.data.models';
import { Subscription } from "../../applications.data.models";
import { NotificationService } from "../../../shared/services/notification.service";
import { ConfirmDialogComponent } from "../../../commons/components/confirm-dialog/confirm-dialog.component";

import * as applicationsActions from '../../applications.actions';

@Component({
  selector: "store-application-detail-main",
  templateUrl: "./application-detail-main.component.html",
  styleUrls: ["./application-detail-main.component.scss"]
})
export class ApplicationDetailMainComponent implements OnInit {
  appId : number;
  activatedTab : string;
  appStatus: string = 'active';

  //Subscription
  public datasource: MatTableDataSource<Subscription> = new MatTableDataSource();

  constructor(
    private route: ActivatedRoute, 
    private store: Store<AppState>,
    private location: Location,
    public dialog: MatDialog,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.appId = params['appId'];
      this.activatedTab = params['tab'];
      this.store.dispatch(
        new applicationsActions.SetSelectedApplicationsAction(this.appId)
      );
    })

    //subscription
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

  switchTab(tab){
    //  this.router.navigate([`/applications/${this.appId}/${tile.route}`]);
    this.activatedTab = tab;
     this.location.replaceState(`/applications/${this.appId}/${tab}`);
  }

  //subscription
  onAction(sub, action) {
    if (action === "unsubscribe") {
      const ref = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: "Confirm Unsubscribe",
          message:
            'Are you sure you want to unsubscribe from "' +
            sub.apiName +
            " - " +
            sub.apiVersion +
            '"?'
        }
      });

      ref.afterClosed().subscribe(res => {
        if (res) {
          this.notification.success("Subscription successfully deleted");
        }
      });
    }
  }
}
