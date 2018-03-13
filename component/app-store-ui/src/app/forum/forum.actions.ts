import { Action } from "@ngrx/store";
import { GetTopicsParam, Topic, CreateTopicParam, TopicDetail } from "./forum.data.models";
import { Actions } from "../applications/applications.actions";

export const GET_ALL_TOPICS = "GET_ALL_TOPICS";
export const GET_ALL_TOPICS_SUCCESS = "GET_ALL_TOPICS_SUCCESS";

export const GET_TOPIC_DETAILS = "GET_TOPIC_DETAILS";
export const GET_TOPIC_DETAILS_SUCCESS = "GET_TOPIC_DETAILS_SUCCESS";

export const DELETE_TOPIC = "DELETE_TOPIC";
export const DELETE_TOPIC_SUCCESS = "DELETE_TOPIC_SUCCESS";

export const CREATE_TOPIC = "CREATE_TOPIC";
export const CREATE_TOPIC_SUCCESS = "CREATE_TOPIC_SUCCESS";

export const SET_SELECTED_TOPIC = "SET_SELECTED_TOPIC";

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

export class CreateTopicAction implements Action {
  readonly type: string = CREATE_TOPIC;
  constructor(public payload: CreateTopicParam) {}
}

export class CreateTopicSuccessAction implements Action {
  readonly type: string = CREATE_TOPIC_SUCCESS;
  constructor(public payload: any = null) {}
}

export class SetSelectedTopicAction implements Action {
  readonly type: string = SET_SELECTED_TOPIC;
  constructor(public payload: Topic) {}
}

export class GetTopicDetailAction implements Action {
  readonly type: string = GET_TOPIC_DETAILS;
  constructor(public payload: string) {}
}

export class GetTopicDetailSuccessAction implements Action {
  readonly type: string = GET_TOPIC_DETAILS_SUCCESS;
  constructor(public payload: TopicDetail) {}
}

export type Actions =
  | GetAllTopicsAction
  | GetAllTopicsSuccessAction
  | DeleteTopicAction
  | DeleteTopicActionSuccessAction
  | CreateTopicAction
  | CreateTopicSuccessAction
  | SetSelectedTopicAction
  | GetTopicDetailAction
  | GetTopicDetailSuccessAction;
