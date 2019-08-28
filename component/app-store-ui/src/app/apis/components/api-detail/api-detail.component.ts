import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { ApiOverview } from '../../apis.models';
import * as apiActions from '../../apis.actions';
import { ApiEndpoints } from '../../../config/api.endpoints';
import { ActivatedRoute } from '@angular/router';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";

@Component({
  selector: 'store-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.scss']
})
export class ApiDetailComponent implements OnInit, OnDestroy {

  public api: ApiOverview;
  public apiPrefix = ApiEndpoints.apiContext;
  public activeTab = 'overview';
  public api_id;

  private subscriptions = {
    selectedApi: null,
    apiOverview: null
  };

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(
      new globalActions.SetBreadcrumbAction([
        new BreadcrumbItem("APIs", "apis"),
        new BreadcrumbItem("API Details")
      ])
    );

    this.subscriptions.apiOverview = this.store.select((s) => s.apis.selectedApiOverview)
      .subscribe((overview) => {
        this.api = overview;
        this.store.dispatch(
          new globalActions.SetBreadcrumbAction([
            new BreadcrumbItem("APIs", "apis"),
            new BreadcrumbItem(overview.name + " - " + overview.version)
          ])
        );
      });

    this.route.params.subscribe( p => {
      this.api_id = p['apiId'];
      if(this.api_id != '') this.store.dispatch(new apiActions.GetApiOverviewAction(this.api_id));
    })
    
  }

  ngOnDestroy(): void {
    this.subscriptions.apiOverview.unsubscribe();
  }

  switchTab(tab){
    this.activeTab = tab;
  }
}
