import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material";
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

@Component({
  selector: "store-application-detail-main",
  templateUrl: "./application-detail-main.component.html",
  styleUrls: ["./application-detail-main.component.scss"]
})
export class ApplicationDetailMainComponent implements OnInit {
  appId: string;
  activatedTab: string;
  appStatus: string = 'active';

  appData:ApplicationDetails;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    public dialog: MatDialog,
    private titleService: Title,
    private actions$: Actions,
    private cd:ChangeDetectorRef
  ) {

    this.route.params.subscribe(params => {
      this.appId = params['appId'];
      this.activatedTab = params['tab'];
      this.store.dispatch(
        applicationsActions.GetApplicationDetailsAction({ "payload": this.appId })
      );
    })

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

    this.actions$.pipe(ofType(applicationsActions.GenerateAppKeySuccess)).pipe(take(1)).subscribe(p => {
      this.store.dispatch(applicationsActions.GetApplicationDetailsAction({ "payload": this.appId }));
    })

  }

  ngOnInit() {
    
  }

  switchTab(tab) {
    this.activatedTab = tab;
    this.location.replaceState(`/applications/${this.appId}/${tab}`);
  }
}