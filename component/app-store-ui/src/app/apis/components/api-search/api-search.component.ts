import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { DoApiSearchAction } from "../../apis.actions";
import { ApiSearchParam, ApiSearchResult, ApiSummary, ApiStatus, paginationData } from "../../apis.models";
import { PageEvent } from "@angular/material";
import { Router } from "@angular/router";

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { ApiEndpoints } from '../../../config/api.endpoints';

@Component({
  selector: "store-api-search",
  templateUrl: "./api-search.component.html",
  styleUrls: ["./api-search.component.scss"]
})
export class ApiSearchComponent implements OnInit {
  apiSearchResult: ApiSummary[];
  apipaginatorData: paginationData[];
  apiStatus: ApiStatus[];
  searchQuery: string;
  apiCategory: ApiStatus = ApiStatus.all;
  // MatPaginator Inputs
  pageSize: number = 5;
  length: number;
  // MatPaginator Output
  pageEvent: PageEvent;
  apiPrefix = ApiEndpoints.apiContext;
  public view:string = "grid";

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ref: ChangeDetectorRef,
    private titleService: Title
  ) {
    this.store
      .select(s => s.apis.apiSearchResult)
      .subscribe((res: ApiSearchResult) => {
        this.apiSearchResult = res.list;
        this.length = res.pagination.total;
        this.ref.markForCheck();
      });

    this.store
      .select(s => s.apis.apiStatus)
      .subscribe(res => (this.apiStatus = res));
  }

  ngOnInit() {
    this.store.dispatch(DoApiSearchAction({ "payload" : new ApiSearchParam(this.apiCategory, '', 5, 0)}));
    this.store.dispatch(new globalActions.SetBreadcrumbAction([new BreadcrumbItem("APIs")]));
    this.titleService.setTitle("APIs | Apigate API Store");
    this.view = (localStorage.getItem('resultview')) ? localStorage.getItem('resultview') : 'grid';
  }

  applyFilter(value: string) {
    value = value.trim().toLocaleLowerCase();
  }

  onSearchClick() {
    this.store.dispatch(DoApiSearchAction({ "payload" : new ApiSearchParam(this.apiCategory, this.searchQuery, this.pageSize, 0)}));
  }

  onApiSelected($event) {
    this.router.navigate(["/apis/detail/", $event.id]);
  }

  onCategoryChange() {
    this.store.dispatch(DoApiSearchAction({ "payload" : new ApiSearchParam(this.apiCategory, this.searchQuery, 5, 0)}));
  }

  onPageChanged(e) {
    let firstCut = e.pageSize * e.pageIndex;
    this.pageSize = e.pageSize;
    this.store.dispatch(DoApiSearchAction({ "payload" : new ApiSearchParam(this.apiCategory, this.searchQuery, e.pageSize, firstCut)}));
  }

  switchView(view){
    this.view = view;
    localStorage.setItem('resultview', view);
  }
}
