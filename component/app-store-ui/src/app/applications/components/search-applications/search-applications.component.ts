import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Application, GetApplicationsParam } from '../../applications.data.models';
import * as applicationsActions from '../../applications.actions';
import * as authActions from '../../../authentication/authentication.actions'
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { ClientRegParam } from '../../../authentication/authentication.models';
import { ConfirmDialogComponent } from '../../../commons/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { getApps, AppState } from '../../applications.reducer';
@Component({
  selector: 'store-search-applications',
  templateUrl: './search-applications.component.html',
  styleUrls: ['./search-applications.component.scss']
})
export class SearchApplicationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Application>();
  public clientData: ClientRegParam;
  length: number;
  appResult;

  public searchQuery: string = '';
  public pageSize: number = 10;
  public hasNextPage = false;
  public hasPrevPage = false;
  private page: number = 0;
  private offset: number = 0;

  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private titleService: Title,
    private actions$: Actions,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.clientData = new ClientRegParam();
    this.store.select((s) => s.authentication.tokenDetails).subscribe((auth) => {
      if (auth) {
        this.store.dispatch(applicationsActions.GetAllApplicationsAction({ payload: new GetApplicationsParam(1, this.pageSize, 0, "") }))
      }
    })

    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("Applications")] }));
    this.titleService.setTitle("Apps | Apigate API Store");
    this.dataSource.sort = this.sort;

    this.store.select(getApps).subscribe(res => {
      if (res) this.dataSource.data = res;
    });

    this.store.select(s => s.apps).subscribe(res => {
      this.hasNextPage = (res.next != "");
      this.hasPrevPage = (res.previous != "");
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  onAppAction(app, action) {
    switch (action) {

      case 'view': {
        this.router.navigate([`applications/${app.applicationId}/prod-key`]);
        break;
      }

      case 'edit': {
        this.router.navigate([`/applications/create/${app.applicationId}`]);
        break;
      }

      default:
        break;
    }
  }

  openDialog(app, event: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(applicationsActions.DeleteApplicationsAction({ "appId": app.applicationId }))

        this.actions$.pipe(ofType(applicationsActions.DeleteApplicationSuccessAction)).subscribe(p => {
          this.store.dispatch(applicationsActions.GetAllApplicationsAction({ payload: new GetApplicationsParam(1, this.pageSize, this.offset, "") }))
        })
      }
    });
  }

  onSearchClick() {
    this.store.dispatch(applicationsActions.GetAllApplicationsAction({ "payload": new GetApplicationsParam(0, this.pageSize, 0, this.searchQuery) }))
  }

  onPageChanged(direction) {
    if (direction == "next") this.page++;
    else this.page--;

    if (this.page < 0) this.page = 0;

    this.offset = this.pageSize * this.page;
    this.store.dispatch(applicationsActions.GetAllApplicationsAction({ payload: new GetApplicationsParam(1, this.pageSize, this.offset, "") }))
  }

}