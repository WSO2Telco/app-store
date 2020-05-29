import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app.data.models';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { ApplicationDetails } from '../../applications.data.models';
import { ApplicationsService } from '../../applications.service';
import { getApp } from '../../applications.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { DoLogoutAction } from '../../../authentication/authentication.actions';

@Component({
  selector: "store-application-detail-main",
  templateUrl: "./application-detail-main.component.html",
  styleUrls: ["./application-detail-main.component.scss"]
})
export class ApplicationDetailMainComponent implements OnInit {
  appId: string;
  activatedTab: string;
  activatedTabIndex: number = 0;
  appStatus: string = 'active';

  appData: ApplicationDetails;

  private appSubscriber;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    // public dialog: MatDialog,
    private titleService: Title,
    private cd: ChangeDetectorRef,
    private appSvc: ApplicationsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.appId = p['appId'];
      this.activatedTab = p['tab'];

      this.appSvc.getApplicationsDetails(this.appId).subscribe(res => {
        if (res) {
          this.appData = res;
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
      },
      (error:HttpErrorResponse) => {
        if(error.status == 401) this.store.dispatch(DoLogoutAction());
      })

      switch (this.activatedTab) {
        case 'prod-key': this.activatedTabIndex = 0; break;
        case 'sandbox-key': this.activatedTabIndex = 1; break;
        case 'subscriptions': this.activatedTabIndex = 2; break;
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

  ngOnDestroy(){
    this.appSubscriber.unsubscribe();
  }

  switchTab(e) {
    this.activatedTabIndex = e.index;
    switch (this.activatedTabIndex) {
      case 0: this.activatedTab = 'prod-key'; break;
      case 1: this.activatedTab = 'sandbox-key'; break;
      case 2: this.activatedTab = 'subscriptions'; break;
    }
    this.location.replaceState(`/applications/${this.appId}/${this.activatedTab}`);
  }
}