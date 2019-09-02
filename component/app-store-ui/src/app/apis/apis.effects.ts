
import { EMPTY } from 'rxjs';
import {catchError, switchMap, map, mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApisService } from './apis.service';
import { NotificationService } from '../shared/services/notification.service';
import * as apiActions from './apis.actions';
import {
    ApiSearchParam, ApiSearchResult, ApplicationSearchParam, Application,
    ApplicationsResult, SubscribeParam, SubscribeResult, ApiOverview
} from './apis.models';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ApiSearchSuccessAction } from './apis.actions';

@Injectable()
export class ApisEffects {

  constructor(
      private actions$: Actions,
      private apiService: ApisService,
      private notification: NotificationService
  ) { }

  apiSearch$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.DO_API_SEARCH),
    mergeMap((action: apiActions.DoApiSearchAction) => this.apiService.search(action.payload)
      .pipe(
        map((result: ApiSearchResult) => ({ type: apiActions.DO_API_SEARCH_SUCCESS, payload: result })),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  apiOverview$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GET_API_OVERVIEW),
    mergeMap((action: apiActions.GetApiOverviewAction) => this.apiService.getApiOverview(action.payload)
      .pipe(
        map((result: ApiOverview) => ({ type: apiActions.GET_API_OVERVIEW_SUCCESS, payload: result })),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  userApplications$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.GET_USER_APPLICATIONS),
    mergeMap((action: apiActions.GetUserApplicationsAction) => this.apiService.getUserApplicationsActions(action.payload)
      .pipe(
        map((result: ApplicationsResult) => {
          if (result.error) {
              result.message = 'Load application error';
              throw result;
          } else {
              const approvedApps = result.applications.filter((app) => app.status === 'APPROVED');
              return ({ type: apiActions.GET_USER_APPLICATIONS_SUCCESS, payload: approvedApps || [] })
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
    ofType(apiActions.DO_SUBSCRIBE),
    mergeMap((action: apiActions.DoSubscribeAction) => this.apiService.subscribe(action.payload)
      .pipe(
        map((result: SubscribeResult) => ({ type: apiActions.DO_SUBSCRIBE_SUCCESS, payload: result })),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));
}