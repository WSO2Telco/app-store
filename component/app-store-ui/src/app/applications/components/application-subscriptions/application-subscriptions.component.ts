import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { Subscription } from "../../applications.data.models";
import * as applicationsActions from "../../applications.actions";
import { ConfirmDialogComponent } from "../../../commons/components/confirm-dialog/confirm-dialog.component";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: "store-application-subscriptions",
  templateUrl: "./application-subscriptions.component.html",
  styleUrls: ["./application-subscriptions.component.scss"]
})
export class ApplicationSubscriptionsComponent implements OnInit {
  public datasource: MatTableDataSource<
    Subscription
  > = new MatTableDataSource();

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private notification: NotificationService
  ) {}

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
