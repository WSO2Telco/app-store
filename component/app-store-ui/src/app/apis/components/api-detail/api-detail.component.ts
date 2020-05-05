import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { ApiOverview, TopicResultPayload } from '../../apis.models';
import * as apiActions from '../../apis.actions';
import { ApiEndpoints } from '../../../config/api.endpoints';
import { ActivatedRoute, Router } from '@angular/router';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { GetApiOverviewAction } from '../../apis.actions';
import { GetAllApplicationsAction } from '../../../applications/applications.actions';
import { GetApplicationsParam } from '../../../applications/applications.data.models';
import { Actions, ofType } from '@ngrx/effects';
import { SetLastAuthRequiredRouteAction } from '../../../authentication/authentication.actions';
import { getApi } from '../../apis.reducers';

@Component({
  selector: 'store-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.scss']
})
export class ApiDetailComponent implements OnInit, OnDestroy {

  private apiSubscriber;
  private apiEntityLoaded = false;
  public apiFullyLoaded = false;

  public api: ApiOverview;
  public apiPrefix = ApiEndpoints.apiContext;
  public api_id;
  public loggedUser: boolean;

  public forumResult;

  similarApis = []

  private subscriptions = {
    apiOverview: null
  };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private cd: ChangeDetectorRef,
    private actions$: Actions
  ) { }

  ngOnInit() {


    let logUser = this.store.select((s) => s.authentication.tokenDetails)
      .subscribe((token) => {
        if (token) {
          this.loggedUser = true;
          if (this.apiFullyLoaded) {
            this.store.dispatch(apiActions.SearchForumTopicsAction({ payload: this.api.name }));
            this.store.dispatch(apiActions.GetUserSubscriptionsAction({ "payload": this.api_id }));
          }
        }
        else this.loggedUser = false;
      });

    this.route.params.subscribe(p => {
      this.api_id = p['apiId'];
      // this.store.dispatch(apiActions.ResetApiOverviewAction());
      if (this.api_id != '') this.store.dispatch(GetApiOverviewAction({ "payload": this.api_id }));

      this.apiSubscriber = this.store.select(getApi(this.api_id)).subscribe(apiEntity => {
        if (apiEntity) {
          this.api = apiEntity;
          this.store.dispatch(
            globalActions.SetBreadcrumbAction({
              payload: [
                new BreadcrumbItem("APIs", "apis"),
                new BreadcrumbItem(apiEntity.name + " - " + apiEntity.version)
              ]
            })
          );
          this.titleService.setTitle(apiEntity.name + " | Apigate API Store");
          if (this.loggedUser) this.store.dispatch(apiActions.SearchForumTopicsAction({ payload: apiEntity.name }));
          this.apiEntityLoaded = true;
        }
        this.cd.detectChanges();
      });

    })

    this.subscriptions.apiOverview = this.actions$.pipe(ofType(apiActions.GetApiOverviewSuccessAction)).subscribe(resp => {
      let overview = resp.payload;
      this.api = overview;
      this.apiFullyLoaded = true;

      if (this.loggedUser) this.store.dispatch(apiActions.GetUserSubscriptionsAction({ "payload": this.api_id }));

      if (!this.apiEntityLoaded) {
        this.store.dispatch(
          globalActions.SetBreadcrumbAction({
            payload: [
              new BreadcrumbItem("APIs", "apis"),
              new BreadcrumbItem(overview.name + " - " + overview.version)
            ]
          })
        );
        this.titleService.setTitle(overview.name + " | Apigate API Store");
        if (this.loggedUser) this.store.dispatch(apiActions.SearchForumTopicsAction({ payload: overview.name }));
      }
      this.cd.detectChanges();
    })

    this.actions$.pipe(ofType(apiActions.SearchForumTopicsSuccessAction)).subscribe(forum => {
      this.forumResult = forum.payload.list;
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.apiOverview.unsubscribe();
    this.cd.detach();
  }

  similarApiNavigate(id) {
    window.scroll(0, 0);
    this.router.navigate(["/apis/detail/", id]);
  }

  onLoginClick() {
    this.store.dispatch(SetLastAuthRequiredRouteAction({ "payload": this.router.url }));
    this.store.dispatch(globalActions.ToggleRightPanelAction({ "payload": true }));
  }
}
