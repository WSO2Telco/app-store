
import {filter} from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import * as globalActions from '../../../app.actions';

@Component({
  selector: 'store-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  activeView: any;

  @Input()
  public isOpen: boolean;

  constructor(private _router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this._router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const tmp = event.url.replace('/', '').split('/');
        if (tmp[0] === 'legacy') {
          tmp.shift();
        }
        this.activeView = tmp;

      });

  }

  onHambergerMenuClick(event) {
    this.store.dispatch(new globalActions.ToggleLeftPanelAction(event));
  }
} 

