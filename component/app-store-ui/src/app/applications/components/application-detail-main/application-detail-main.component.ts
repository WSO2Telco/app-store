import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material/dialog";
import { Store, createSelector, select } from '@ngrx/store';

import { AppState } from '../../../app.data.models';
import * as applicationsActions from '../../applications.actions';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { Application, ApplicationDetails } from '../../applications.data.models';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApplicationsService } from '../../applications.service';
import { getApp } from '../../applications.reducer';

@Component({
  selector: "store-application-detail-main",
  templateUrl: "./application-detail-main.component.html",
  styleUrls: ["./application-detail-main.component.scss"]
})
export class ApplicationDetailMainComponent implements OnInit {
  appId: string;
  activatedTab: string;
  activatedTabIndex:number = 0;
  appStatus: string = 'active';

  appData:ApplicationDetails;

  private appSubscriber;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    public dialog: MatDialog,
    private titleService: Title,
    private actions$: Actions,
    private cd:ChangeDetectorRef
  ) {
    this.actions$.pipe(ofType(applicationsActions.GetApplicationDetailsSuccessAction)).pipe(take(1)).subscribe(p => {
      if (p) {
        this.appData = p.payload
        this.store.dispatch(
          globalActions.SetBreadcrumbAction({
            payload: [
              new BreadcrumbItem("Applications", "applications"),
              new BreadcrumbItem(this.appData.name)
            ]
          })
        );

        this.titleService.setTitle(`${this.appData.name} | Apigate API Store`);
        this.cd.detectChanges();
      }
    })

    this.actions$.pipe(ofType(applicationsActions.GenerateAppKeySuccessAction)).subscribe(p => {
      this.store.dispatch(applicationsActions.GetApplicationDetailsAction({ "payload": this.appId }));
    })

    this.actions$.pipe(ofType(applicationsActions.RegenerateSecretSuccessAction)).subscribe(p => {
      this.store.dispatch(applicationsActions.GetApplicationDetailsAction({ "payload": this.appId }));
    })

    this.actions$.pipe(ofType(applicationsActions.UpdateAppKeySuccessAction)).subscribe(p => {
      this.store.dispatch(applicationsActions.GetApplicationDetailsAction({ "payload": this.appId }));
    })

  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.appId = p['appId'];
      this.activatedTab = p['tab'];
      setTimeout(() => {
        this.store.dispatch(applicationsActions.GetApplicationDetailsAction({ "payload": this.appId }));
      }, 1000) // temp

      switch(this.activatedTab){
        case 'prod-key' : this.activatedTabIndex = 0; break;
        case 'sandbox-key' : this.activatedTabIndex = 1; break;
        case 'subscriptions' : this.activatedTabIndex = 2; break;
      }

      this.appSubscriber = this.store.select(getApp(this.appId)).subscribe(appEntity => {
        if (appEntity) {
          this.appData = appEntity;
          this.store.dispatch(
            globalActions.SetBreadcrumbAction({
              payload: [
                new BreadcrumbItem("Applications", "applications"),
                new BreadcrumbItem(appEntity.name + " - " + appEntity.version)
              ]
            })
          );
          this.titleService.setTitle(appEntity.name + " | Apigate API Store");
        }
        this.cd.detectChanges();
      });

    })
  }

  switchTab(e) {
    this.activatedTabIndex = e.index;
    switch(this.activatedTabIndex){
      case 0 : this.activatedTab = 'prod-key'; break;
      case 1 : this.activatedTab = 'sandbox-key'; break;
      case 2 : this.activatedTab = 'subscriptions'; break;
    }
    this.location.replaceState(`/applications/${this.appId}/${this.activatedTab}`);
  }
}