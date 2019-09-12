import { props, createAction } from '@ngrx/store';
import { Application, Subscription, ApplicationListResult } from './applications.data.models';

export const GetAllApplicationsAction = createAction('[App] Get All Apps', props<{payload: any}>());
export const GetAllApplicationsSuccessAction = createAction('[App] Get All Apps Success ✓', props<{payload: ApplicationListResult}>());

export const SetSelectedApplicationsAction = createAction('[App] Set Selected App', props<{payload: any}>());

export const GetApplicationSubscriptionsAction = createAction('[App] Get App Subscriptions', props<{payload: Application}>());
export const GetApplicationSubscriptionsSuccessAction = createAction('[App] Get App Subscriptions Success ✓', props<{payload: Subscription[]}>());