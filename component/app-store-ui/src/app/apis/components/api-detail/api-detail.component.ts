import {
  Component, OnInit, ComponentFactoryResolver, NgZone, AfterViewInit, ApplicationRef,
  ViewChild, ElementRef, Injector, OnDestroy
} from '@angular/core';
import { ApiSubscriptionComponent } from '../api-subscription/api-subscription.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.models';
import { ToggleLeftPanelAction } from '../../../app.actions';
import { ApiSummery } from '../../apis.models';

@Component({
  selector: 'store-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.scss']
})
export class ApiDetailComponent implements OnInit, OnDestroy {

  public api: ApiSummery;

  private subscriptions = {
    selectedApi: null
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscriptions.selectedApi = this.store.select((s) => s.apis.selectedApi).subscribe((api) => this.api = api);
  }

  ngOnDestroy(): void {
    this.subscriptions.selectedApi.unsubscribe();
  }
}
