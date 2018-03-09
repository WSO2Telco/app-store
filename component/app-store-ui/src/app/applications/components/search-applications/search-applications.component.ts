import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material';
import { Application } from '../../applications.data.models';
import * as applicationsActions from '../../applications.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'store-search-applications',
  templateUrl: './search-applications.component.html',
  styleUrls: ['./search-applications.component.scss']
})
export class SearchApplicationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Application>();
  searchQuery:string;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store
      .select(s => s.applications.allApplications)
      .subscribe(apps => (this.dataSource.data = apps));

    this.store.dispatch(new applicationsActions.GetAllApplicationsAction());
  }

  onAppAction(app, action) {
    switch (action) {
      case 'view': {
        this.store.dispatch(
          new applicationsActions.SetSelectedApplicationsAction(app)
        );
        this.router.navigate(['applications/detail']);
        break;
      }

      default:
        break;
    }
  }

  onSearchClick(){}
}
