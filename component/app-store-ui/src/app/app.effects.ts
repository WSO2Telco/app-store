
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AppService } from './app.service';
import * as appActons from './app.actions';
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
    ofType(appActons.LOAD_COUNTRIES),
    mergeMap((action: appActons.LoadCountriesAction) => this.appService.getCountries()
      .pipe(
        map((result:  Country[]) => ({ type: appActons.LOAD_COUNTRIES_SUCCESS, payload: result })),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  operators$ = createEffect(() => this.actions$.pipe(
    ofType(appActons.LOAD_OPERATORS),
    mergeMap((action: appActons.LoadOperatorsAction) => this.appService.getOperators(action.payload)
      .pipe(
        map((result:  Operator[]) => ({ type: appActons.LOAD_OPERATORS_SUCCESS, payload: result })),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

}




