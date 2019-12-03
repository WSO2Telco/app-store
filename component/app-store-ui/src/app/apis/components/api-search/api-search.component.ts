import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { DoApiSearchAction, GetAvailableApplicationAction } from "../../apis.actions";
import { ApiSearchParam, ApiSearchResult, ApiSummary, ApiStatus, paginationData } from "../../apis.models";
import { PageEvent, MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { ApiEndpoints } from '../../../config/api.endpoints';
import { ApiTagComponent } from '../api-tag/api-tag.component';
import { GetAllApplicationsAction } from '../../../applications/applications.actions';
import { GetApplicationsParam } from '../../../applications/applications.data.models';

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
  offsetSize: number = 0;
  length: number;
  // MatPaginator Output
  pageEvent: PageEvent;
  apiPrefix = ApiEndpoints.apiContext;
  public view: string = "grid";
  tagName: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ref: ChangeDetectorRef,
    private titleService: Title,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
      this.tagName = p['tag'];
      if (this.tagName != undefined) this.store.dispatch(DoApiSearchAction({ "payload": new ApiSearchParam(this.apiCategory, 'tag:' + this.tagName, this.pageSize, 0) }));
    })

    this.store.select((s) => s.authentication.tokenDetails).subscribe((auth) => {
      if (auth) {
        this.store.dispatch(GetAvailableApplicationAction({}))
      }
    })

    /*  this.actions$.pipe(ofType(applicationsActions.GetAllApplicationsSuccessAction)).subscribe(p => {
       if (p) {
         this.store
           .select(s => s.applications.allApplications)
           .subscribe(apps => {
             this.dataSource.data = apps.list;
             this.appResult = apps;
           });
       }
     }) */

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ApiTagComponent, {
      width: '500px',
    });
  }

  applyFilter(value: string) {
    value = value.trim().toLocaleLowerCase();
  }

  onSearchClick() {
    this.store.dispatch(DoApiSearchAction({ "payload": new ApiSearchParam(this.apiCategory, this.searchQuery, this.pageSize, 0) }));
  }

  onApiSelected($event) {
    this.router.navigate(["/apis/detail/", $event.id]);
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
