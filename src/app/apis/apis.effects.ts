import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApisService } from './apis.service';
import { NotificationService } from '../shared/services/notification.service';
import * as apiActions from './apis.actions';
import { Observable } from 'rxjs/Observable';
import { ApiSearchParam, ApiSearchResult } from './apis.models';
import { Effect, Actions } from '@ngrx/effects';
import { ApiSearchSuccessAction } from './apis.actions';

@Injectable()
export class ApisEffects {

    constructor(
        private actions$: Actions,
        private apiService: ApisService,
        private notification: NotificationService) { }

    @Effect() apiSearch$ = this.actions$
        .ofType(apiActions.DO_API_SEARCH)
        .map((action: apiActions.DoApiSearchAction) => action.payload)
        .switchMap((payload: ApiSearchParam) => this.apiService.search(payload)
            .map((result: ApiSearchResult) => new ApiSearchSuccessAction(result))
            .catch((e: HttpErrorResponse) => {
                this.notification.error(e.message);
                return Observable.empty();
            })
        );


}
