import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { mergeMap, catchError, map} from 'rxjs/operators';
import { ApplicationsService } from './applications.service';
import * as applicationsActions from './applications.actions';
import { Application, Subscription } from './applications.data.models';
import { NotificationService } from '../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private service: ApplicationsService,
    private notification: NotificationService
  ) {}

  countries$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetAllApplicationsAction),
    mergeMap(({payload}) => this.service.getAllApplications(payload)
      .pipe(
        map((response:Application[]) => applicationsActions.GetAllApplicationsSuccessAction({ "payload" : response})),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  appSubscriptions$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetApplicationSubscriptionsAction),
    mergeMap(({payload}) => this.service.getApplicationSubscriptions(payload)
      .pipe(
        map((response:Subscription[]) => applicationsActions.GetApplicationSubscriptionsSuccessAction({ "payload" : response})),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ))
}
