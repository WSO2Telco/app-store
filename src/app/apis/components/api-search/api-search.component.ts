import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.models';
import { Store } from '@ngrx/store';
import { DoApiSearchAction } from '../../apis.actions';
import { ApiSearchParam, ApiSearchResult, ApiSummery } from '../../apis.models';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'store-api-search',
  templateUrl: './api-search.component.html',
  styleUrls: ['./api-search.component.scss']
})
export class ApiSearchComponent implements OnInit {

  private apiSearchResult: MatTableDataSource<ApiSummery> = new MatTableDataSource();

  constructor(private store: Store<AppState>) {
    this.store.select(s => s.apis.apiSearchResult)
      .subscribe((res: ApiSearchResult) => { this.apiSearchResult.data = res.apis; });
  }

  ngOnInit() {
    this.store.dispatch(new DoApiSearchAction(new ApiSearchParam()));
  }

  applyFilter(value: string) {
    value = value.trim().toLocaleLowerCase();
    this.apiSearchResult.filter = value;
  }

}
