import {
  Component, OnInit, ComponentFactoryResolver, NgZone, AfterViewInit, ApplicationRef,
  ViewChild, ElementRef, Injector, OnDestroy
} from '@angular/core';
import { ApiSubscriptionComponent } from '../api-subscription/api-subscription.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { ToggleLeftPanelAction } from '../../../app.actions';
import { ApiSummery, ApiOverview } from '../../apis.models';
import * as apiActions from '../../apis.actions';
import { ApiEndpoints } from '../../../config/api.endpoints';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'store-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.scss']
})
export class ApiDetailComponent implements OnInit, OnDestroy {

  // public api: ApiSummery;
  public api: ApiOverview;
  public apiPrefix = ApiEndpoints.apiContext;
  public activeTab = 'overview';

  private subscriptions = {
    selectedApi: null,
    apiOverview: null
  };

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.apiOverview = this.store.select((s) => s.apis.selectedApiOverview)
      .subscribe((overview) => this.api = overview);

    this.route.params.subscribe( p => {
      let api_id = p['apiId'];
      if(api_id != '') this.store.dispatch(new apiActions.GetApiOverviewAction(api_id));
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.apiOverview.unsubscribe();
  }

  switchTab(tab){
    this.activeTab = tab;
  }
}
