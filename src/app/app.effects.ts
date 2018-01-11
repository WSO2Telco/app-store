import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Actions, Effect } from '@ngrx/effects';
import * as appActons from './app.actions';
import { Action } from '@ngrx/store/src/models';
import { Country } from './app.models';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './shared/services/notification.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AppGlobalEffects {

    constructor(
        private appService: AppService,
        private actions$: Actions,
        private notification: NotificationService) { }


    @Effect()
    countries$ = this.actions$
        .ofType(appActons.LOAD_COUNTRIES)
        .map((action: appActons.LoadCountriesAction) => action.payload)
        .switchMap(() => this.appService.getCountries()
            .map((result: Country[]) => new appActons.LoadCountriesSuccessAction(result))
            .catch((e: HttpErrorResponse) => {
                this.notification.error(e.message);
                return Observable.empty();
            })
        );


}




