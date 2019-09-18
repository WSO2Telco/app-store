import { props, createAction } from '@ngrx/store';
import { Application, Subscription, ApplicationListResult, ApplicationDetails, SubscriptionResult } from './applications.data.models';

export const GetAllApplicationsAction = createAction('[App] Get All Apps');
export const GetAllApplicationsSuccessAction = createAction('[App] Get All Apps Success ✓', props<{payload: ApplicationListResult}>());

export const SetSelectedApplicationsAction = createAction('[App] Set Selected App', props<{payload: any}>());

export const GetApplicationDetailsAction = createAction('[App] Get App Details', props<{payload: string}>());
export const GetApplicationDetailsSuccessAction = createAction('[App] Get App Details Success ✓', props<{payload: ApplicationDetails}>());

export const GetApplicationSubscriptionsAction = createAction('[App] Get App Subscriptions', props<{payload: string}>());
export const GetApplicationSubscriptionsSuccessAction = createAction('[App] Get App Subscriptions Success ✓', props<{payload: SubscriptionResult}>());