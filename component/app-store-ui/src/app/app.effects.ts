
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AppService } from './app.service';
import * as appActions from './app.actions';
import { Country, Operator, Tier } from './app.data.models';
import { NotificationService } from './shared/services/notification.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';



@Injectable()
export class AppGlobalEffects {

  constructor(
    private appService: AppService,
    private actions$: Actions,
    private notification: NotificationService
  ) { }

  countries$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.LoadCountriesAction),
    mergeMap(() => this.appService.getCountries()
      .pipe(
        map((result:  Country[]) => (appActions.LoadCountriesSuccessAction({"payload" : result}))),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  operators$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.LoadOperatorsAction),
    mergeMap(({payload}) => this.appService.getOperators(payload)
      .pipe(
        map((result:  Operator[]) => (appActions.LoadOperatorsSuccessAction({"payload" : result}))),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  updateTheme$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.AppThemeChangeAction),
    mergeMap(({ payload }) => this.appService.UpdateTheme(payload)
      .pipe(
        map((response) => {
          if (response.error) {
            this.notification.error('New Theme update failed ');
            throw response;
          } else {
            this.notification.success('New Theme successfully updated ');
            return appActions.AppThemeChangeSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error('New Theme update failed');
          return EMPTY
        })
      )
    )
  ));

}




