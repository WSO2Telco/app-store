import { props, createAction } from '@ngrx/store';
import { ApplicationListResult, ApplicationDetails, CreateApplicationParam, CreateAppResponseData, GetApplicationsParam } from './applications.data.models';

export const GetAllApplicationsAction = createAction('[App] Get All Apps with Filters', props<{ payload: GetApplicationsParam }>());
export const GetAllApplicationsSuccessAction = createAction('[App] Get All Apps Success ✓', props<{ payload: ApplicationListResult }>());

export const SetSelectedApplicationsAction = createAction('[App] Set Selected App', props<{ payload: any }>());

export const GetApplicationDetailsAction = createAction('[App] Get App Details', props<{ payload: string }>());
export const GetApplicationDetailsSuccessAction = createAction('[App] Get App Details Success ✓', props<{ payload: ApplicationDetails }>());

export const CreateApplicationsAction = createAction('[App] Create App', props<{ payload: CreateApplicationParam }>());
export const CreateApplicationSuccessAction = createAction('[App] Create App Success ✓', props<{ payload: CreateAppResponseData }>());
export const CreateApplicationFailedAction = createAction('[App] Create App Failed ✓', props<{ payload: string }>());

export const DeleteApplicationsAction = createAction('[App] Delete App', props<{ appId: string }>());
export const DeleteApplicationSuccessAction = createAction('[App] Delete App Success ✓', props<{ payload: any }>());

export const UpdateApplicationsAction = createAction('[App] Update App', props<{ appId: string, payload: CreateApplicationParam }>());
export const UpdateApplicationSuccessAction = createAction('[App] Update App Success ✓', props<{ payload: CreateAppResponseData }>());