import { props, createAction } from '@ngrx/store';
import { Application, Subscription, ApplicationListResult, ApplicationDetails, SubscriptionResult, CreateApplicationParam, CreateAppResponseData, GetApplicationsParam, GenerateKeyPayload } from './applications.data.models';

export const GetAllAvailableApplicationsAction = createAction('[App] Get All Available Apps', props<{ }>());
export const GetAllAvailableApplicationsSuccessAction = createAction('[App] Get All Available Apps Success ✓', props<{ payload: ApplicationListResult }>());

export const GetAllApplicationsAction = createAction('[App] Get All Apps with Filters', props<{ payload: GetApplicationsParam }>());
export const GetAllApplicationsSuccessAction = createAction('[App] Get All Apps Success ✓', props<{ payload: ApplicationListResult }>());

export const SetSelectedApplicationsAction = createAction('[App] Set Selected App', props<{ payload: any }>());

export const GetApplicationDetailsAction = createAction('[App] Get App Details', props<{ payload: string }>());
export const GetApplicationDetailsSuccessAction = createAction('[App] Get App Details Success ✓', props<{ payload: ApplicationDetails }>());

export const GetApplicationSubscriptionsAction = createAction('[App] Get App Subscriptions', props<{ payload: string }>());
export const GetApplicationSubscriptionsSuccessAction = createAction('[App] Get App Subscriptions Success ✓', props<{ payload: SubscriptionResult }>());

export const CreateApplicationsAction = createAction('[App] Create App', props<{ payload: CreateApplicationParam }>());
export const CreateApplicationSuccessAction = createAction('[App] Create App Success ✓', props<{ payload: CreateAppResponseData }>());

export const DeleteApplicationsAction = createAction('[App] Delete App', props<{ appId: string }>());
export const DeleteApplicationSuccessAction = createAction('[App] Delete App Success ✓', props<{ payload: any }>());

export const UpdateApplicationsAction = createAction('[App] Update App', props<{ appId: string, payload: CreateApplicationParam }>());
export const UpdateApplicationSuccessAction = createAction('[App] Update App Success ✓', props<{ payload: CreateAppResponseData }>());

export const GenerateAppKeyAction = createAction('[App] Generate App Key', props<{ appId: string, payload: GenerateKeyPayload }>());
export const GenerateAppKeySuccessAction = createAction('[App] Generate App Key Success ✓');

export const UpdateAppKeyAction = createAction('[App] Update App Key', props<{ appId: string, payload: GenerateKeyPayload }>());
export const UpdateAppKeySuccessAction = createAction('[App] Update App Key Success ✓');

export const RegenerateSecretAction = createAction('[App] Regenerate Key Secret', props<{ payload: string }>());
export const RegenerateSecretSuccessAction = createAction('[App] Regenerate Key Secret Success ✓');

export const RegenerateAccessTokenAction = createAction('[App] Regenerate Access Token', props<{ payload: any }>());
export const RegenerateAccessTokenSuccessAction = createAction('[App] Regenerate Access Token Success ✓', props<{ payload: any }>());