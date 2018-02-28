import { ApplicationsService } from './applications.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as applicationsActions from './applications.actions';
import { Application, Subscription } from './applications.data.models';
import { NotificationService } from '../shared/services/notification.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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
    .ofType(applicationsActions.GET_ALL_APPLICATIONS)
    .map(
      (action: applicationsActions.GetAllApplicationsAction) => action.payload
    )
    .switchMap(param =>
      this.service
        .getAllApplications(param)
        .map(
          (result: Application[]) =>
            new applicationsActions.GetAllApplicationsSuccessAction(result)
        )
        .catch((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return Observable.empty();
        })
    );


  @Effect()
  appSubscriptions$ = this.actions$
    .ofType(applicationsActions.GET_APPLICATION_SUBSCRIPTIONS)
    .map(
      (action: applicationsActions.GetApplicationSubscriptionsAction) => action.payload
    )
    .switchMap(param =>
      this.service
        .getApplicationSubscriptions(param)
        .map(
          (result: Subscription[]) =>
            new applicationsActions.GetApplicationSubscriptionsSuccessAction(result)
        )
        .catch((e: HttpErrorResponse) => {
          this.notification.error(e.message);
          return Observable.empty();
        })
    );
}
