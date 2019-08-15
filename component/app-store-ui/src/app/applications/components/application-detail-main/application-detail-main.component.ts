import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material";
import { Store } from '@ngrx/store';

import { AppState } from '../../../app.data.models';
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

  constructor(
    private route: ActivatedRoute, 
    private store: Store<AppState>,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.appId = params['appId'];
      this.activatedTab = params['tab'];
      this.store.dispatch(
        new applicationsActions.SetSelectedApplicationsAction(this.appId)
      );
    })
  }

  switchTab(tab){
    //  this.router.navigate([`/applications/${this.appId}/${tile.route}`]);
    this.activatedTab = tab;
     this.location.replaceState(`/applications/${this.appId}/${tab}`);
  }
}