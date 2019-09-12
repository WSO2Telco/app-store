import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material";
import { Store } from '@ngrx/store';

import { AppState } from '../../../app.data.models';
import * as applicationsActions from '../../applications.actions';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { Application } from '../../applications.data.models';

@Component({
  selector: "store-application-detail-main",
  templateUrl: "./application-detail-main.component.html",
  styleUrls: ["./application-detail-main.component.scss"]
})
export class ApplicationDetailMainComponent implements OnInit {
  appId : string;
  activatedTab : string;
  appStatus: string = 'active';

  appData:Application = null;

  constructor(
    private route: ActivatedRoute, 
    private store: Store<AppState>,
    private location: Location,
    public dialog: MatDialog,
    private titleService: Title
  ) {
    
  }

  ngOnInit() {
    this.store.select((s) => s.applications.selectedApplication).subscribe((app) => {
      this.appData = app;

      this.store.dispatch(
        new globalActions.SetBreadcrumbAction([
          new BreadcrumbItem("Applications", "applications"),
          new BreadcrumbItem(app.name)
        ])
      );
  
      this.titleService.setTitle(`${app.name} | Apigate API Store`);
    })
    
    this.route.params.subscribe( params => {
      this.appId = params['appId'];
      this.activatedTab = params['tab'];
      this.store.dispatch(
        applicationsActions.GetApplicationDetailsAction({"payload":this.appId})
      );
    })
  }

  switchTab(tab){
    this.activatedTab = tab;
    this.location.replaceState(`/applications/${this.appId}/${tab}`);
  }
}