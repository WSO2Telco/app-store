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

@Component({
  selector: 'store-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.scss']
})
export class ApiDetailComponent implements OnInit, OnDestroy {

  public api: ApiOverview;
  public apiPrefix = ApiEndpoints.apiContext;
  public activeTab = 'overview';
  public api_id;
  public loggedUser: string;

  public forumResult;

  //temp
  similarApis = [
    { id: '594fcf74-77c7-40ae-96cc-f3b0bdc1a9a3', name: "API 1", version: "1.0", provider: "admin", stars: 5 },
    { id: '438eecf2-a96b-42a2-9123-17d6c6cf6a5a', name: "APIWithReallyReallyLongName", version: "1.0", provider: "admin", stars: 3.5 },
    { id: '438eecf2-a96b-42a2-9123-17d6c6cf6a5a', name: "API 3", version: "1.0", provider: "admin", stars: 2 },
    { id: '438eecf2-a96b-42a2-9123-17d6c6cf6a5a', name: "API 4", version: "1.0", provider: "admin", stars: 2 },
    { id: '438eecf2-a96b-42a2-9123-17d6c6cf6a5a', name: "API 5", version: "1.0", provider: "admin", stars: 2 },
  ]

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

    this.store.dispatch(
      globalActions.SetBreadcrumbAction({
        payload: [
          new BreadcrumbItem("APIs", "apis"),
          new BreadcrumbItem("API Details")
        ]
      })
    );

    let logUser = this.store.select((s) => s.authentication.loggedUser)
      .subscribe((overview) => {
        this.loggedUser = overview;
      });

    this.route.params.subscribe(p => {
      this.api_id = p['apiId'];
      this.store.dispatch(apiActions.ResetApiOverviewAction());
      if (this.api_id != '') this.store.dispatch(GetApiOverviewAction({ "payload": this.api_id }));
    })

    this.subscriptions.apiOverview = this.actions$.pipe(ofType(apiActions.GetApiOverviewSuccessAction)).subscribe(resp => {
      let overview = resp.payload;
      this.api = overview;
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

  switchTab(tab) {
    this.activeTab = tab;
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
