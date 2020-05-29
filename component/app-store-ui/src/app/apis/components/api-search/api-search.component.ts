import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { DoApiSearchAction, GetAvailableApplicationAction } from "../../apis.actions";
import { ApiSearchParam, ApiStatus } from "../../apis.models";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { ApiEndpoints } from '../../../config/api.endpoints';
import { ApiTagComponent } from '../api-tag/api-tag.component';
import { getApis, AppState } from '../../apis.reducers';

@Component({
  selector: "store-api-search",
  templateUrl: "./api-search.component.html",
  styleUrls: ["./api-search.component.scss"]
})
export class ApiSearchComponent implements OnInit {
  public view: string = "grid";
  public apiPrefix = ApiEndpoints.apiContext;
  public length: number;

  public apiList;

  public searchQuery: string;
  public apiStatus: ApiStatus[] = [ApiStatus.all, ApiStatus.prototyped, ApiStatus.published];
  public apiCategory: ApiStatus = ApiStatus.all;
  public pageSize: number = 5;
  public offsetSize: number = 0;

  constructor(
    private store: Store<AppState>,
    private ref: ChangeDetectorRef,
    private titleService: Title,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {

    this.store.select(s => s.apis.pagination).subscribe(res => {
      if(res) this.length = res.total;
      this.ref.markForCheck();
    });

    this.store.select(getApis).subscribe(res => {
      if(res) this.apiList = res;
      this.ref.markForCheck();
    });

    this.route.queryParams.subscribe(params => {
      this.offsetSize = parseInt(params['page']) || 0;
      this.pageSize = parseInt(params['perPage']) || 5;
    });
  }

  ngOnInit() {
    this.store.dispatch(DoApiSearchAction({ "payload": new ApiSearchParam(this.apiCategory, '', 5, 0) }));
    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("APIs")] }));
    this.titleService.setTitle("APIs | Apigate API Store");
    this.view = (localStorage.getItem('resultview')) ? localStorage.getItem('resultview') : 'grid';

    this.route.params.subscribe(p => {
      let tag = p['tag'];
      if (tag != undefined) this.store.dispatch(DoApiSearchAction({ "payload": new ApiSearchParam(this.apiCategory, 'tag:' + tag, this.pageSize, 0) }));
    })

    this.store.select((s) => s.authentication.tokenDetails).subscribe((auth) => {
      if (auth) {
        this.store.dispatch(GetAvailableApplicationAction({}))
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ApiTagComponent, {
      width: '500px',
    });
  }

  onSearchClick() {
    this.store.dispatch(DoApiSearchAction({ "payload": new ApiSearchParam(this.apiCategory, this.searchQuery, this.pageSize, 0) }));
  }

  onCategoryChange() {
    this.store.dispatch(DoApiSearchAction({ "payload": new ApiSearchParam(this.apiCategory, this.searchQuery, this.pageSize, 0) }));
  }

  onPageChanged(e) {
    let offset = e.pageSize * e.pageIndex;
    this.pageSize = e.pageSize;
    this.store.dispatch(DoApiSearchAction({ "payload": new ApiSearchParam(this.apiCategory, this.searchQuery, e.pageSize, offset) }));
  }

  switchView(view) {
    this.view = view;
    localStorage.setItem('resultview', view);
  }
}