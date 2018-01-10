import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.models';
import { ToggleLeftPanelAction } from '../../../app.actions';

@Component({
  selector: 'store-api-subscription',
  templateUrl: './api-subscription.component.html',
  styleUrls: ['./api-subscription.component.scss'],
})
export class ApiSubscriptionComponent implements OnInit {

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
  }

  onToggle() {
    this.store.dispatch(new ToggleLeftPanelAction());
  }
}
