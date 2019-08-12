import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import { TabTile } from "../../applications.data.models";
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

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private store: Store<AppState>,
    private location: Location
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
