import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { GetUserSubscriptionsAction, DoNewSubscribeAction, DoNewSubscribeSuccessAction, UnsubscribeAction, UnsubscribeSuccessAction } from '../../apis.actions';
import { ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { ActionDialogComponent } from '../../../commons/components/action-dialog/action-dialog.component';
import { AddNewSubsParam } from '../../apis.models';
import { ConfirmDialogComponent } from '../../../commons/components/confirm-dialog/confirm-dialog.component';
import { AppState } from '../../apis.reducers';

@Component({
    selector: 'store-api-app-subscriptions',
    templateUrl: './api-app-subscriptions.component.html',
    styleUrls: ['./api-app-subscriptions.component.scss']
})
export class ApiAppSubscriptionsComponent implements OnInit {
    api_id: string;
    appResult;
    @Input() public apiTiers;
    @Input() public subscriptionList;
    @Input() public loadingSubscriptions;
    @Output() loadingSubscriptionsChange = new EventEmitter<boolean>();

    constructor(
        private store: Store<AppState>,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private actions$: Actions,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(p => {
            this.api_id = p['apiId'];
        })

        this.store.select(s => s.apis.availableApp).subscribe(apps => {
            this.appResult = apps.list;
            this.appResult = this.appResult.filter(
                appArr => appArr.status == "APPROVED");
        });
    }

    doSubscribe(event: any) {
        var mapResult = this.appResult.filter(appArr => {
            return !this.subscriptionList.some(function (sub) {
                return appArr.applicationId == sub.applicationId;
            });
        });
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
                let tier = "Default";
                if (this.apiTiers.length > 0) {
                    if (this.apiTiers.includes("Unlimited")) tier = "Unlimited";
                    else {
                        tier = (this.apiTiers.includes("Default")) ? "Default" : this.apiTiers[0];
                    }
                }

                this.store.dispatch(DoNewSubscribeAction({ payload: new AddNewSubsParam(tier, this.api_id, result) }));

                this.actions$.pipe(ofType(DoNewSubscribeSuccessAction)).subscribe(p => {
                    if (p) {
                        this.store.dispatch(GetUserSubscriptionsAction({ payload: this.api_id }));
                        this.loadingSubscriptionsChange.emit(this.loadingSubscriptions = true);
                    }
                })
            }
        });
    }

    mapAppName(id) {
        if (this.appResult.length > 0) {
            let app = this.appResult.find(itm => itm.applicationId == id);
            return app.name
        }
        else return "";
    }

    doUnsubscribe(sub, action) {

        if (action === "unsubscribe") {
            const ref = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    title: "Confirm Unsubscribe",
                    message:
                        'Are you sure you want to unsubscribe the Application of "' +
                        this.mapAppName(sub.applicationId) + '"?'
                }
            });

            ref.afterClosed().subscribe((confirmed: boolean) => {
                if (confirmed) {
                    this.store.dispatch(UnsubscribeAction({ subscriptionId: sub.subscriptionId }));

                    this.actions$.pipe(ofType(UnsubscribeSuccessAction)).subscribe(p => {
                        this.store.dispatch(GetUserSubscriptionsAction({ payload : this.api_id }));
                        this.loadingSubscriptionsChange.emit(this.loadingSubscriptions = true);
                    })
                }
            });
        }
    }
}