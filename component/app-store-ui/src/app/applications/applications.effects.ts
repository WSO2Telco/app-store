import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';

import { EMPTY, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ApplicationsService } from './applications.service';
import * as applicationsActions from './applications.actions';
import { Application, Subscription, ApplicationListResult, ApplicationDetails, SubscriptionResult, CreateApplicationParam, CreateAppResponseData } from './applications.data.models';
import { NotificationService } from '../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './applications.reducer';
import { DoLogoutAction } from '../authentication/authentication.actions';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private service: ApplicationsService,
    private notification: NotificationService,
    private store: Store<AppState>
  ) { }

  getAllAvailableApps$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetAllAvailableApplicationsAction),
    mergeMap(({ }) => this.service.getAllAvailableApplications()
      .pipe(
        map((response: ApplicationListResult) => applicationsActions.GetAllAvailableApplicationsSuccessAction({ "payload": response })),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  getAllApps$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetAllApplicationsAction),
    mergeMap(({ payload }) => this.service.getAllApplications(payload)
      .pipe(
        map((response: ApplicationListResult) => applicationsActions.GetAllApplicationsSuccessAction({ "payload": response })),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  getAppDetails$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetApplicationDetailsAction),
    mergeMap(({ payload }) => this.service.getApplicationsDetails(payload)
      .pipe(
        map((response: ApplicationDetails) => applicationsActions.GetApplicationDetailsSuccessAction({ "payload": response })),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  appSubscriptions$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetApplicationSubscriptionsAction),
    mergeMap(({ payload }) => this.service.getApplicationSubscriptions(payload)
      .pipe(
        map((response: SubscriptionResult) => applicationsActions.GetApplicationSubscriptionsSuccessAction({ "payload": response })),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ))

  createApps$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.CreateApplicationsAction),
    mergeMap(({ payload }) => this.service.createApplication(payload)
      .pipe(
        map((response: CreateAppResponseData) => {
          if (response.message) {
            this.notification.error(response.message);
            return applicationsActions.CreateApplicationFailedAction({ "payload": response.message })
          } else {
            this.notification.success("Application created successfully");
            return applicationsActions.CreateApplicationSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          return of(applicationsActions.CreateApplicationFailedAction({ payload: e.error.description }));
        })
      )
    )
  ));


  updateApps$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.UpdateApplicationsAction),
    mergeMap(({ appId, payload }) => this.service.updateApplication(appId, payload)
      .pipe(
        map((response: CreateAppResponseData) => {
          if (response.message) {
            this.notification.error(response.message);
            throw response;
          } else {
            this.notification.success("Application Updated successfully");
            return applicationsActions.UpdateApplicationSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());

          if (e.error.code == '500') {
            this.notification.error("Application is available having the same name");
          } else {
            this.notification.error(e.error.description);
          }
          return EMPTY
        })
      )
    )
  ));

  deleteApps$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.DeleteApplicationsAction),
    mergeMap(({ appId }) => this.service.deleteApplication(appId)
      .pipe(
        map((response: any) => {
          if (response) {
            this.notification.error(response);
            throw response;
          } else {
            this.notification.success("Application Deleted successfully");
            return applicationsActions.DeleteApplicationSuccessAction({ "payload": response });
          }
        }),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error("Application Delete Unsuccessfull");
          return EMPTY
        })
      )
    )
  ));

  appKeysGenerate$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GenerateAppKeyAction),
    mergeMap(({ appId, payload }) => this.service.generateAppKey(appId, payload)
      .pipe(
        map((e) => {
          this.notification.success("Key generated successfully !!");
          return applicationsActions.GenerateAppKeySuccessAction()
        }),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  appKeysUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.UpdateAppKeyAction),
    mergeMap(({ appId, payload }) => this.service.updateAppKey(appId, payload)
      .pipe(
        map((e) => {
          this.notification.success("Key Details Updated Successfully !!");
          return applicationsActions.UpdateAppKeySuccessAction()
        }),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  keySecretRegenerate$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.RegenerateSecretAction),
    mergeMap(({ payload }) => this.service.regenerateKeySecret(payload)
      .pipe(
        map((e) => {
          this.notification.success("Key Regenerated Successfully !!");
          return applicationsActions.RegenerateSecretSuccessAction()
        }),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  accessTokenRegenerate$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.RegenerateAccessTokenAction),
    mergeMap(({ payload }) => this.service.revokeAccessToken(payload)
      .pipe(
        map((response) => {
          return applicationsActions.RegenerateAccessTokenAction2({ "payload": payload })
        }),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));

  accessTokenRegenerateStep2$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.RegenerateAccessTokenAction),
    mergeMap(({ payload }) => this.service.regenerateAccessToken(payload)
      .pipe(
        map((response) => {
          this.notification.success("Key Regenerated Successfully !!");
          return applicationsActions.RegenerateAccessTokenSuccessAction({ "payload": response })
        }),
        catchError((e: HttpErrorResponse) => {
          if(e.status == 401) this.store.dispatch(DoLogoutAction());
          else this.notification.error(e.message);
          return EMPTY
        })
      )
    )
  ));
}
