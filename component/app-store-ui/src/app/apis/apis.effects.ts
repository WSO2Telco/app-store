
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApisService } from './apis.service';
import { NotificationService } from '../shared/services/notification.service';
import * as apiActions from './apis.actions';
import {
  // ApiSearchResult,
  ApplicationsResult, SubscribeResult, ApiOverview, TagListResult, TopicResult,
} from './apis.models';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ApplicationListResult, ApplicationDetails } from '../applications/applications.data.models';
import { Store } from '@ngrx/store';
import { AppState } from './apis.reducers';
import { DoLogoutAction } from '../authentication/authentication.actions';

@Injectable()
export class ApisEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApisService,
    private notification: NotificationService,
    private store: Store<AppState>
  ) { }

  apiSearch$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.DoApiSearchAction),
    mergeMap(({ payload }) => this.apiService.search(payload)
      .pipe(
        map((result: any) => (apiActions.ApiSearchSuccessAction({ "payload": result }))),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  apiOverview$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GetApiOverviewAction),
    mergeMap(({ payload }) => this.apiService.getApiOverview(payload)
      .pipe(
        map((result: ApiOverview) => (apiActions.GetApiOverviewSuccessAction({ "payload": result }))),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  apiTag$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GetApiTagAction),
    mergeMap(({ }) => this.apiService.getApiTag()
      .pipe(
        map((result: TagListResult) => (apiActions.GetApiTagSuccessAction({ "payload": result }))),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  addNewSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.DoNewSubscribeAction),
    mergeMap(({ payload }) => this.apiService.newApiSubscription(payload)
      .pipe(
        map((result: any) => (this.notification.success('Successfully subscribe to the new application'), apiActions.DoNewSubscribeSuccessAction({ "payload": result }))),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.error.message);
          return EMPTY
        })
      )
    )));

  getAvailableApps$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GetAvailableApplicationAction),
    mergeMap(({ }) => this.apiService.getAvailableApplications()
      .pipe(
        map((response: ApplicationListResult) => (apiActions.GetAvailableApplicationSuccessAction({ "payload": response }))),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          // this.store.dispatch(DoLogoutAction());
          return EMPTY
        })
      )
    )
  ));

  deleteSubscription$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.UnsubscribeAction),
    mergeMap(({ subscriptionId }) => this.apiService.deleteSubscription(subscriptionId)
      .pipe(
        map((response: any) => {
          if (response) {
            this.notification.error(response);
            throw response;
          } else {
            this.notification.success("Successfully Unsubscribe the Subscription");
            return apiActions.UnsubscribeSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.error);
          return EMPTY
        })
      )
    )
  ));

  userSubscriptions$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GetUserSubscriptionsAction),
    mergeMap(({ payload }) => this.apiService.getUserSubscriptions(payload)
      .pipe(
        map((result: ApplicationsResult) => {
          if (result.error) {
            result.message = 'Load subscriptions error';
            throw result;
          } else {
            return (apiActions.GetUserSubscriptionsSuccessAction({ "payload": result }))
          }
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  subscribe$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.DoSubscribeAction),
    mergeMap(({ payload }) => this.apiService.subscribe(payload)
      .pipe(
        map((result: SubscribeResult) => (apiActions.DoSubscribeSuccessAction({ "payload": result }))),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          // this.store.dispatch(DoLogoutAction());
          return EMPTY
        })
      )
    )
  ));

  forumSearch$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.SearchForumTopicsAction),
    mergeMap(({ payload }) => this.apiService.searchForum(payload)
      .pipe(
        map((result: TopicResult) => (apiActions.SearchForumTopicsSuccessAction({ payload: result.payload }))),
        catchError((e: HttpErrorResponse) => {
          console.log(e);
          this.notification.error(e.message);
          // this.store.dispatch(DoLogoutAction());
          return EMPTY
        })
      )
    )
  ));
}