import { createAction, props } from '@ngrx/store';
import { ApiSearchParam, SubscribeParam, ApiOverview, TagListResult, AddNewSubsParam } from './apis.models';
import { ApplicationListResult } from '../applications/applications.data.models';
import { TopicResultPayload } from '../forum/forum.data.models';

export const DoApiSearchAction = createAction('[API] Search', props<{ payload: ApiSearchParam }>());
export const ApiSearchSuccessAction = createAction('[API] Search Success ✓', props<{ payload: any }>());

export const GetApiOverviewAction = createAction('[API] Get API Overview', props<{ payload: string }>());
export const GetApiOverviewSuccessAction = createAction('[API] Get API Overview Success ✓', props<{ payload: ApiOverview }>());

export const GetApiTagAction = createAction('[API] Get API Tag', props());
export const GetApiTagSuccessAction = createAction('[API] Get API Tag Success ✓', props<{ payload: TagListResult }>());

export const GetUserSubscriptionsAction = createAction('[API] Get User Subscriptions', props<{ payload: string }>());
export const GetUserSubscriptionsSuccessAction = createAction('[API] Get User Subscriptions Success ✓', props<{ payload: any }>());

export const DoSubscribeAction = createAction('[API] Do Subscribe', props<{ payload: SubscribeParam }>());
export const DoSubscribeSuccessAction = createAction('[API] Do Subscribe Success ✓', props<{ payload: any }>());

export const DoNewSubscribeAction = createAction('[API] Do new App Subscription', props<{ payload: AddNewSubsParam }>());
export const DoNewSubscribeSuccessAction = createAction('[API] Do new App Subscription Success ✓', props<{ payload: any }>());

export const UnsubscribeAction = createAction('[API] unsubscribe Subscription', props<{ subscriptionId: string }>());
export const UnsubscribeSuccessAction = createAction('[API] unsubscribe Subscription Success ✓', props<{ payload: any }>());

export const GetAvailableApplicationAction = createAction('[API] Get Available Apps', props<{}>());
export const GetAvailableApplicationSuccessAction = createAction('[API] Get Available Apps Success ✓', props<{ payload: ApplicationListResult }>());

export const SearchForumTopicsAction = createAction('[API] Search Forum Topics', props<{ payload: string }>());
export const SearchForumTopicsSuccessAction = createAction('[API] Search Forum Topics Success ✓', props<{ payload: TopicResultPayload }>());