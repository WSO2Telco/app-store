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

@Component({
  selector: "store-application-detail-main",
  templateUrl: "./application-detail-main.component.html",
  styleUrls: ["./application-detail-main.component.scss"]
})
export class ApplicationDetailMainComponent implements OnInit {
  appId : string;
  activatedTab : string;
  appStatus: string = 'active';

  constructor(
    private route: ActivatedRoute, 
    private store: Store<AppState>,
    private location: Location,
    public dialog: MatDialog,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.appId = params['appId'];
      this.activatedTab = params['tab'];
      this.store.dispatch(
        applicationsActions.GetApplicationDetailsAction({"payload":this.appId})
      );
    })

    this.store.dispatch(
      new globalActions.SetBreadcrumbAction([
        new BreadcrumbItem("Applications", "applications"),
        new BreadcrumbItem("Application Details")
      ])
    );

    this.titleService.setTitle("App Details | Apigate API Store");
  }

  switchTab(tab){
    //  this.router.navigate([`/applications/${this.appId}/${tile.route}`]);
    this.activatedTab = tab;
     this.location.replaceState(`/applications/${this.appId}/${tab}`);
  }
}