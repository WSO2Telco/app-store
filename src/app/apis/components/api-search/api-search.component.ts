import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.models';
import { Store } from '@ngrx/store';
import { DoApiSearchAction } from '../../apis.actions';
import { ApiSearchParam } from '../../apis.models';

@Component({
  selector: 'store-api-search',
  templateUrl: './api-search.component.html',
  styleUrls: ['./api-search.component.scss']
})
export class ApiSearchComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new DoApiSearchAction(new ApiSearchParam()));
  }

}
