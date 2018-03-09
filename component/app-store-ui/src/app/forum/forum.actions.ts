import { Action } from "@ngrx/store";
import { GetTopicsParam, Topic } from "./forum.data.models";
import { Actions } from "../applications/applications.actions";

export const GET_ALL_TOPICS = "GET_ALL_TOPICS";
export const GET_ALL_TOPICS_SUCCESS = "GET_ALL_TOPICS_SUCCESS";

export const DELETE_TOPIC = "DELETE_TOPIC";
export const DELETE_TOPIC_SUCCESS = "DELETE_TOPIC_SUCCESS";

export class GetAllTopicsAction implements Action {
  readonly type: string = GET_ALL_TOPICS;
  constructor(public payload: GetTopicsParam=null) {}
}

export class GetAllTopicsSuccessAction implements Action {
  readonly type: string = GET_ALL_TOPICS_SUCCESS;
  constructor(public payload: Topic[]) {}
}

export class DeleteTopicAction implements Action {
  readonly type: string = DELETE_TOPIC;
  constructor(public payload: string) {}
}

export class DeleteTopicActionSuccessAction implements Action {
  readonly type: string = DELETE_TOPIC_SUCCESS;
  constructor(public payload: any = null) {}
}

export type Actions =
  | GetAllTopicsAction
  | GetAllTopicsSuccessAction
  | DeleteTopicAction
  | DeleteTopicActionSuccessAction;
