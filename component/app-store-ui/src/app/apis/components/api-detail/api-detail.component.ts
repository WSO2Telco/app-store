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

@Component({
  selector: 'store-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.scss']
})
export class ApiDetailComponent implements OnInit, OnDestroy {

  public api: ApiSummery;
  public apiOverview: ApiOverview;

  private subscriptions = {
    selectedApi: null,
    apiOverview: null
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscriptions.selectedApi = this.store.select((s) => s.apis.selectedApi).subscribe((api) => this.api = api);
    this.subscriptions.apiOverview = this.store.select((s) => s.apis.selectedApiOverview)
      .subscribe((overview) => this.apiOverview = overview);

    this.store.dispatch(new apiActions.GetApiOverviewAction(this.api.id));
  }

  ngOnDestroy(): void {
    this.subscriptions.selectedApi.unsubscribe();
    this.subscriptions.apiOverview.unsubscribe();
  }
}
