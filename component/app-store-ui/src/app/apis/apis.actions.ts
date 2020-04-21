import { createAction, props } from '@ngrx/store';
import { ApiSearchParam, ApiSearchResult, Application, SubscribeParam, ApiOverview, ApplicationSearchParam, tagData, TagListResult, sdkParam, Subscription, AddNewSubsParam } from './apis.models';
import { Operator } from '../app.data.models';
import { ApplicationListResult } from '../applications/applications.data.models';
import { TopicResultPayload } from '../forum/forum.data.models';

export const DoApiSearchAction = createAction('[API] Search', props<{ payload: ApiSearchParam }>());
export const ApiSearchSuccessAction = createAction('[API] Search Success ✓', props<{ payload: ApiSearchResult }>());

export const GetApiOverviewAction = createAction('[API] Get API Overview', props<{ payload: string }>());
export const GetApiOverviewSuccessAction = createAction('[API] Get API Overview Success ✓', props<{ payload: ApiOverview }>());
export const ResetApiOverviewAction = createAction('[API] Reset API Overview');

export const GetApiTagAction = createAction('[API] Get API Tag', props());
export const GetApiTagSuccessAction = createAction('[API] Get API Tag Success ✓', props<{ payload: TagListResult }>());

export const GetUserApplicationsAction = createAction('[API] Get User Apps', props<{ payload: any }>());
export const GetUserApplicationsSuccessAction = createAction('[API] Get User Apps Success ✓', props<{ payload: Application[] }>());

export const GetUserSubscriptionsAction = createAction('[API] Get User Subscriptions', props<{ payload: string }>());
export const GetUserSubscriptionsSuccessAction = createAction('[API] Get User Subscriptions Success ✓', props<{ payload: any }>());

export const DoSubscribeAction = createAction('[API] Do Subscribe', props<{ payload: SubscribeParam }>());
export const DoSubscribeSuccessAction = createAction('[API] Do Subscribe Success ✓', props<{ payload: any }>());

export const DoNewSubscribeAction = createAction('[API] Do new App Subscription', props<{ payload: AddNewSubsParam }>());
export const DoNewSubscribeSuccessAction = createAction('[API] Do new App Subscription Success ✓', props<{ payload: any }>());

export const UnsubscribeAction = createAction('[API] unsubscribe Subscription', props<{ subscriptionId: string }>());
export const UnsubscribeSuccessAction = createAction('[API] unsubscribe Subscription Success ✓', props<{ payload: any }>());

// export const GetApiSdkAction = createAction('[API] Do Api Sdk', props<{ payload: sdkParam }>());
// export const GetApiSdkSuccessAction = createAction('[API] Do Api Sdk Success ✓', props<{ payload: any }>());

// export const AddOperatorToSelectionAction = createAction('[API] Add Operator To Selection', props<{ payload: Operator }>());
// export const RemoveOperatorFromSelectionAction = createAction('[API] Remove Operator From Selection', props<{ payload: Operator }>());
// export const RemoveAllOperatorFromSelectionAction = createAction('[API] Remove All Operators From Selection', props<{ payload: any }>());

export const GetAvailableApplicationAction = createAction('[API] Get Available Apps', props<{}>());
export const GetAvailableApplicationSuccessAction = createAction('[API] Get Available Apps Success ✓', props<{ payload: ApplicationListResult }>());

export const SearchForumTopicsAction = createAction('[API] Search Forum Topics', props<{ payload: string }>());
export const SearchForumTopicsSuccessAction = createAction('[API] Search Forum Topics Success ✓', props<{ payload: TopicResultPayload }>());