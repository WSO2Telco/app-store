import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { DoApiSearchAction, SetSelectedApiAction } from "../../apis.actions";
import {
  ApiSearchParam,
  ApiSearchResult,
  ApiSummery,
  ApiStatus,
  paginationData
} from "../../apis.models";
import { Observable } from "rxjs";
import { MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "store-api-search",
  templateUrl: "./api-search.component.html",
  styleUrls: ["./api-search.component.scss"]
})
export class ApiSearchComponent implements OnInit {
  apiSearchResult: ApiSummery[];
  apipaginatorData: paginationData[];
  apiStatus: ApiStatus[];
  searchQuery: string;
  apiCategory: ApiStatus;
  // MatPaginator Inputs
  pageSize: number = 5;
  length: number;
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ref: ChangeDetectorRef
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
    this.store.dispatch(new DoApiSearchAction(new ApiSearchParam(this.apiCategory, '', 5, 0)));
  }

  applyFilter(value: string) {
    value = value.trim().toLocaleLowerCase();
  }

  onSearchClick() {
    this.store.dispatch(
      new DoApiSearchAction(
        new ApiSearchParam(this.apiCategory, this.searchQuery, 5, 0)
      )
    );
  }

  onApiSelected($event) {
    this.store.dispatch(new SetSelectedApiAction($event));
    this.router.navigate(["/apis/detail"]);
  }

  onCategoryChange() {
    this.store.dispatch(
      new DoApiSearchAction(
        new ApiSearchParam(this.apiCategory, this.searchQuery, 5, 0)
      )
    );
  }

  onPageChanged(e) {
    let firstCut = e.pageSize * e.pageIndex;
    this.store.dispatch(new DoApiSearchAction(new ApiSearchParam(this.apiCategory, this.searchQuery, e.pageSize, firstCut)));
  }
}
