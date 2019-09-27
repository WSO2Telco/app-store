
import { EMPTY } from 'rxjs';
import {catchError, switchMap, map, mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApisService } from './apis.service';
import { NotificationService } from '../shared/services/notification.service';
import * as apiActions from './apis.actions';
import { DoApiSearchAction}  from './apis.actions';
import {
    ApiSearchParam, ApiSearchResult, ApplicationSearchParam, Application,
    ApplicationsResult, SubscribeParam, SubscribeResult, ApiOverview
} from './apis.models';
import { Actions, ofType, createEffect } from '@ngrx/effects';

@Injectable()
export class ApisEffects {

  constructor(
      private actions$: Actions,
      private apiService: ApisService,
      private notification: NotificationService
  ) { }

  apiSearch$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.DoApiSearchAction),
    mergeMap(({payload}) => this.apiService.search(payload)
      .pipe(
        map((result: ApiSearchResult) => (apiActions.ApiSearchSuccessAction({ "payload" : result}))),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  apiOverview$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GetApiOverviewAction),
    mergeMap(({payload}) => this.apiService.getApiOverview(payload)
      .pipe(
        map((result: ApiOverview) => (apiActions.GetApiOverviewSuccessAction({"payload" : result}))),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  userApplications$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GetUserApplicationsAction),
    mergeMap(({payload}) => this.apiService.getUserApplicationsActions(payload)
      .pipe(
        map((result: ApplicationsResult) => {
          if (result.error) {
              result.message = 'Load application error';
              throw result;
          } else {
              const approvedApps = result.applications.filter((app) => app.status === 'APPROVED');
              return (apiActions.GetUserApplicationsSuccessAction({"payload": approvedApps || []}))
          }
        }),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  userSubscriptions$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GetUserSubscriptionsAction),
    mergeMap(({payload}) => this.apiService.getUserSubscriptions(payload)
      .pipe(
        map((result: ApplicationsResult) => {
          if (result.error) {
              result.message = 'Load subscriptions error';
              throw result;
          } else {
              return (apiActions.GetUserSubscriptionsSuccessAction({"payload": result}))
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
    mergeMap(({payload}) => this.apiService.subscribe(payload)
      .pipe(
        map((result: SubscribeResult) => (apiActions.DoSubscribeSuccessAction({ "payload" : result}))),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));
}