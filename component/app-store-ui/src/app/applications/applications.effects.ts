
import {empty as observableEmpty,  Observable } from 'rxjs';

import {switchMap, catchError, map} from 'rxjs/operators';
import { ApplicationsService } from './applications.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as applicationsActions from './applications.actions';
import { Application, Subscription } from './applications.data.models';
import { NotificationService } from '../shared/services/notification.service';

import { HttpErrorResponse } from '@angular/common/http';
import { GET_APPLICATION_SUBSCRIPTIONS, GetApplicationSubscriptionsSuccessAction } from './applications.actions';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private service: ApplicationsService,
    private notification: NotificationService
  ) {}

  @Effect()
  countries$ = this.actions$
    .ofType(applicationsActions.GET_ALL_APPLICATIONS).pipe(
    map(
      (action: applicationsActions.GetAllApplicationsAction) => action.payload
    ),
    switchMap(param =>
      this.service
        .getAllApplications(param).pipe(
        map(
          (result: Application[]) =>
            new applicationsActions.GetAllApplicationsSuccessAction(result)
        ),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return observableEmpty();
        }),)
    ),);

  @Effect()
  appSubscriptions$ = this.actions$
    .ofType(applicationsActions.GET_APPLICATION_SUBSCRIPTIONS).pipe(
    map(
      (action: applicationsActions.GetApplicationSubscriptionsAction) => action.payload
    ),
    switchMap(param =>
      this.service
        .getApplicationSubscriptions(param).pipe(
        map(
          (result: Subscription[]) =>
            new applicationsActions.GetApplicationSubscriptionsSuccessAction(result)
        ),
        catchError((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return observableEmpty();
        }),)
    ),);
}
