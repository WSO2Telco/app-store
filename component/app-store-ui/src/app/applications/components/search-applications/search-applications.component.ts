import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material';
import { Application } from '../../applications.data.models';
import * as applicationsActions from '../../applications.actions';

@Component({
  selector: 'store-search-applications',
  templateUrl: './search-applications.component.html',
  styleUrls: ['./search-applications.component.scss']
})
export class SearchApplicationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Application>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(s => s.applications.allApplications)
      .subscribe(apps => (this.dataSource.data = apps));

      this.store.dispatch(new applicationsActions.GetAllApplicationsAction());
  }
}
