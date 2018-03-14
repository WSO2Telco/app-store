import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { DoApiSearchAction, SetSelectedApiAction } from "../../apis.actions";
import {
  ApiSearchParam,
  ApiSearchResult,
  ApiSummery,
  ApiStatus
} from "../../apis.models";
import { Observable } from "rxjs/Observable";
import { MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "store-api-search",
  templateUrl: "./api-search.component.html",
  styleUrls: ["./api-search.component.scss"]
})
export class ApiSearchComponent implements OnInit {
  apiSearchResult: ApiSummery[];
  apiStatus: ApiStatus[];
  searchQuery: string;
  apiCategory: ApiStatus;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    this.store
      .select(s => s.apis.apiSearchResult)
      .subscribe((res: ApiSearchResult) => {
        this.apiSearchResult = res.apis;
        this.ref.markForCheck();
      });

    this.store
      .select(s => s.apis.apiStatus)
      .subscribe(res => (this.apiStatus = res));
  }

  ngOnInit() {
    this.store.dispatch(new DoApiSearchAction(new ApiSearchParam()));
  }

  applyFilter(value: string) {
    value = value.trim().toLocaleLowerCase();
  }

  onSearchClick() {
    this.store.dispatch(
      new DoApiSearchAction(
        new ApiSearchParam(this.apiCategory, this.searchQuery)
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
        new ApiSearchParam(this.apiCategory, this.searchQuery)
      )
    );
  }
}
