import { Action } from '@ngrx/store';
import { Application } from './applications.data.models';

export const GET_ALL_APPLICATIONS = 'GET_ALL_APPLICATIONS';
export const GET_ALL_APPLICATIONS_SUCCESS = 'GET_ALL_APPLICATIONS_SUCCESS';

export class GetAllApplicationsAction implements Action {
  readonly type: string = GET_ALL_APPLICATIONS;
  constructor(public payload: any = null) {}
}

export class GetAllApplicationsSuccessAction implements Action {
  readonly type: string = GET_ALL_APPLICATIONS_SUCCESS;
  constructor(public payload: Application[]) {}
}

export type Actions =
  | GetAllApplicationsAction
  | GetAllApplicationsSuccessAction;
