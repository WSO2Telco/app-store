import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'store-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  activeView: any;

  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const tmp = event.url.replace('/', '').split('/');
        if (tmp[0] === 'legacy') {
          tmp.shift();
        }
        this.activeView = tmp;

      });

  }
}

