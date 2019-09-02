
import {empty as observableEmpty,  Observable } from 'rxjs';

import {switchMap, catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Actions, Effect } from '@ngrx/effects';
import * as appActons from './app.actions';
import { Action } from '@ngrx/store/src/models';
import { Country, Operator, Tier } from './app.data.models';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './shared/services/notification.service';



@Injectable()
export class AppGlobalEffects {

    constructor(
        private appService: AppService,
        private actions$: Actions,
        private notification: NotificationService) { }


    // @Effect()
    // countries$ = this.actions$
    //     .ofType(appActons.LOAD_COUNTRIES).pipe(
    //     map((action: appActons.LoadCountriesAction) => action.payload),
    //     switchMap(() => this.appService.getCountries().pipe(
    //         map((result: Country[]) => new appActons.LoadCountriesSuccessAction(result)),
    //         catchError((e: HttpErrorResponse) => {
    //             this.notification.error(e.message);
    //             return observableEmpty();
    //         }),)
    //     ),);

    // @Effect()
    // operators$ = this.actions$
    //     .ofType(appActons.LOAD_OPERATORS).pipe(
    //     map((action: appActons.LoadOperatorsAction) => action.payload),
    //     switchMap((payload: Country) => this.appService.getOperators(payload).pipe(
    //         map((result: Operator[]) => new appActons.LoadOperatorsSuccessAction(result)),
    //         catchError((e: HttpErrorResponse) => {
    //             this.notification.error(e.message);
    //             return observableEmpty();
    //         }),)
    //     ),);
}




