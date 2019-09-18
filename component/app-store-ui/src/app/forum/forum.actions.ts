import { createAction, props } from "@ngrx/store";
import { Topic, CreateTopicParam, TopicDetail, GetTopicsParam } from "./forum.data.models";

export const GetAllTopicsAction = createAction('[Forum] Get All Topics', props<{payload: GetTopicsParam}>());
export const GetAllTopicsSuccessAction = createAction('[Forum] Get All Topics Success ✓', props<{payload: Topic[]}>());

export const DeleteTopicAction = createAction('[Forum] Delete Topic', props<{payload: string}>());
export const DeleteTopicSuccessAction = createAction('[Forum]  Delete Topic Success ✓');

export const CreateTopicAction = createAction('[Forum] Create Topic', props<{payload: CreateTopicParam}>());
export const CreateTopicSuccessAction = createAction('[Forum] Create Topic Success ✓');

export const SetSelectedTopicAction = createAction('[Forum] Set Selected Topic', props<{payload: Topic}>());

export const GetTopicDetailAction = createAction('[Forum] Get Topic Detail', props<{payload: string}>());
export const GetTopicDetailSuccessAction = createAction('[Forum] Get Topic Detail Success ✓', props<{payload: TopicDetail}>());