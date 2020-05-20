import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from "../../applications.data.models";
import { ConfirmDialogComponent } from "../../../commons/components/confirm-dialog/confirm-dialog.component";
import { NotificationService } from "../../../shared/services/notification.service";
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../../applications.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApisService } from '../../../apis/apis.service';
import { ApiSearchParam, ApiStatus, AddNewSubsParam } from '../../../apis/apis.models';
import { map, catchError, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../applications.reducer';

@Component({
  selector: 'store-application-subscriptions',
  templateUrl: './application-subscriptions.component.html',
  styleUrls: ['./application-subscriptions.component.scss']
})
export class ApplicationSubscriptionsComponent implements OnInit {

  public datasource: MatTableDataSource<Subscription> = new MatTableDataSource();
  appId: string;

  constructor(
    public dialog: MatDialog,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private appSvc: ApplicationsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.appId = params['appId'];
      this.appSvc.getApplicationSubscriptions(this.appId).subscribe(res => {
        this.datasource.data = res.list;
        this.cd.detectChanges();
      })
    })
  }

  //subscription
  onAction(sub, action) {
    if (action === "unsubscribe") {
      const ref = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: "Confirm Unsubscribe",
          message: 'Are you sure you want to unsubscribe from "' + sub.apiIdentifier + '"?'
        }
      });
      ref.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.appSvc.deleteSubscription(sub.subscriptionId).subscribe(res => {

            let subs = this.datasource.data;
            const index = subs.findIndex(s => s.subscriptionId == sub.subscriptionId);
            if (index !== undefined) subs.splice(index, 1);
            this.datasource.data = subs;

          })
        }
      });
    }
  }

  newSubscription() {
    const addSubs = this.dialog.open(DialogAppAddSubscription, {
      width: '380px',
      data: { appId: this.appId, subs: this.datasource.data }
    });

    addSubs.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        const data = this.datasource.data;
        data.push(result);
        this.datasource.data = data;
      }
    });
  }

}

@Component({
  selector: 'dialog-application-add-subscriptions',
  templateUrl: 'dialog-add-subscription.html'
})
export class DialogAppAddSubscription implements OnInit {

  public apiAutoComplete$: Observable<any> = null;
  public subsForm: FormGroup;
  public apiFormControl = new FormControl("", [Validators.required]);

  private apiStatus: ApiStatus = ApiStatus.published;
  private apiQuery = new ApiSearchParam(this.apiStatus, "", 10, 0);

  constructor(
    private apiSvc: ApisService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogAppAddSubscription>,
    private store: Store<AppState>
  ) {
    this.store.select((s) => s.global.layout.appTheme).subscribe((theme) => {
      dialogRef.addPanelClass(theme);
    });
  }

  ngOnInit(): void {
    this.subsForm = new FormGroup({
      apiSelect: this.apiFormControl
    });

    this.apiAutoComplete$ = this.apiFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        return this.lookup(value);
      })
    );
  }

  lookup(value: string): Observable<any> {
    this.apiQuery.query = value;
    return this.apiSvc.search(this.apiQuery).pipe(
      map(results => {
        return results.list.filter(apiItm => {
          return !this.data.subs.some(function (sub) {
            let apiname = encodeURIComponent(apiItm.name);
            apiname = apiname.replace(/-/g, '%2D');
            return (`${apiItm.provider}-${apiname}-${apiItm.version}` == sub.apiIdentifier) || apiItm.status != "PUBLISHED";
          });
        })
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

  displayFn(api) {
    return api ? api.name : "";
  }

  onSubmit(form) {
    let sub = form.value.apiSelect;
    if (typeof sub === 'object') {
      this.apiSvc.getApiOverview(sub.id).subscribe(api => {

        if (api) {

          let tier = "Default";
          if (api.tiers.length > 0) {
            if (api.tiers.includes("Unlimited")) tier = "Unlimited";
            else {
              tier = (api.tiers.includes("Default")) ? "Default" : api.tiers[0];
            }
          }

          let payload = new AddNewSubsParam(tier, api.id, this.data.appId);

          this.apiSvc.newApiSubscription(payload).subscribe(subresp => {
            this.dialogRef.close(subresp);
          })
        }
      })
    }
    else {
      this.apiFormControl.setValue("");
    }
  }
}