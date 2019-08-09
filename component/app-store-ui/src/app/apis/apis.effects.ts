
import {empty as observableEmpty,  Observable } from 'rxjs';

import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApisService } from './apis.service';
import { NotificationService } from '../shared/services/notification.service';
import * as apiActions from './apis.actions';
import {
    ApiSearchParam, ApiSearchResult, ApplicationSearchParam, Application,
    ApplicationsResult, SubscribeParam, SubscribeResult, ApiOverview
} from './apis.models';
import { Effect, Actions } from '@ngrx/effects';
import { ApiSearchSuccessAction } from './apis.actions';

@Injectable()
export class ApisEffects {

    constructor(
        private actions$: Actions,
        private apiService: ApisService,
        private notification: NotificationService) { }

    @Effect() apiSearch$ = this.actions$
        .ofType(apiActions.DO_API_SEARCH).pipe(
        map((action: apiActions.DoApiSearchAction) => action.payload),
        switchMap((payload: ApiSearchParam) => this.apiService.search(payload).pipe(
            map((result: ApiSearchResult) => new ApiSearchSuccessAction(result)),
            catchError((e: HttpErrorResponse) => {
                this.notification.error(e.message);
                return observableEmpty();
            }),)
        ),);


    @Effect() apiOverview$ = this.actions$
        .ofType(apiActions.GET_API_OVERVIEW).pipe(
        map((action: apiActions.GetApiOverviewAction) => action.payload),
        switchMap((payload) => this.apiService.getApiOverview(payload).pipe(
            map((result: ApiOverview) => new apiActions.GetApiOverviewSuccessAction(result)),
            catchError((e: HttpErrorResponse) => {
                this.notification.error(e.message);
                return observableEmpty();
            }),)
        ),);

    @Effect() userApplications$ = this.actions$
        .ofType(apiActions.GET_USER_APPLICATIONS).pipe(
        map((action: apiActions.GetUserApplicationsAction) => new ApplicationSearchParam('getApplications')),
        switchMap((payload: ApplicationSearchParam) => this.apiService.getUserApplicationsActions(payload).pipe(
            map((result: ApplicationsResult) => {
                if (result.error) {
                    result.message = 'Load application error';
                    throw result;
                } else {
                    const approvedApps = result.applications.filter((app) => app.status === 'APPROVED');
                    return new apiActions.GetUserApplicationsSuccessAction(approvedApps || []);
                }
            }),
            catchError((e: HttpErrorResponse) => {
                this.notification.error(e.message);
                return observableEmpty();
            }),)
        ),);

    @Effect()
    subscribe$ = this.actions$
        .ofType(apiActions.DO_SUBSCRIBE).pipe(
        map((action: apiActions.DoSubscribeAction) => action.payload),
        switchMap((payload: SubscribeParam) => this.apiService.subscribe(payload).pipe(
            map((result: SubscribeResult) => new apiActions.DoSubscribeSuccessAction(result)),
            catchError((e: HttpErrorResponse) => {
                this.notification.error(e.message);
                return observableEmpty();
            }),)
        ),);

}
