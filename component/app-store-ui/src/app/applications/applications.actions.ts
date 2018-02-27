import { Action } from "@ngrx/store";
import { Application } from "./applications.data.models";
import { SET_SELECTED_API } from "../apis/apis.actions";

export const GET_ALL_APPLICATIONS = "GET_ALL_APPLICATIONS";
export const GET_ALL_APPLICATIONS_SUCCESS = "GET_ALL_APPLICATIONS_SUCCESS";

export const SET_SELECTED_APPLICATION = "SET_SELECTED_APPLICATION";

export class GetAllApplicationsAction implements Action {
  readonly type: string = GET_ALL_APPLICATIONS;
  constructor(public payload: any = null) {}
}

export class GetAllApplicationsSuccessAction implements Action {
  readonly type: string = GET_ALL_APPLICATIONS_SUCCESS;
  constructor(public payload: Application[]) {}
}

export class SetSelectedApplicationsAction implements Action {
  readonly type: string = SET_SELECTED_APPLICATION;
  constructor(public payload: Application) {}
}

export type Actions =
  | GetAllApplicationsAction
  | GetAllApplicationsSuccessAction
  | SetSelectedApplicationsAction;
