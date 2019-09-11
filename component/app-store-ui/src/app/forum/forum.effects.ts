
import { Injectable } from "@angular/core";
import { ForumService } from "./forum.service";
import { HttpErrorResponse } from "@angular/common/http";
import * as forumActions from "./forum.actions";
import { GET_ALL_TOPICS, CreateTopicAction, GetTopicDetailSuccessAction } from './forum.actions';
import { TopicResult } from "./forum.data.models";
import { NotificationService } from "../shared/services/notification.service";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class ForumEffects {
  constructor(
    private service: ForumService,
    private notification: NotificationService,
    private actions$: Actions
  ) {}

  apiSearch$ = createEffect(() => this.actions$.pipe(
    ofType(forumActions.GET_ALL_TOPICS),
    mergeMap((action: forumActions.GetAllTopicsAction) => this.service.getAllTopics(action.payload)
      .pipe(
        map((result: TopicResult) => ({ type: forumActions.GET_ALL_TOPICS_SUCCESS, payload: result.data })),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  deleteTopic$ = createEffect(() => this.actions$.pipe(
    ofType(forumActions.DELETE_TOPIC),
    mergeMap((action: forumActions.DeleteTopicAction) => this.service.deleteTopic(action.payload)
      .pipe(
        map((result:any) => {
          if (!result.error) return new forumActions.GetAllTopicsAction();
          else throw Error("Operation Failed");
        }),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  createTopic$ = createEffect(() => this.actions$.pipe(
    ofType(forumActions.CREATE_TOPIC),
    mergeMap((action: forumActions.CreateTopicAction) => this.service.createTopic(action.payload)
      .pipe(
        map((result:any) => {
          if (!result.error) {
            this.notification.success("Forum topic successfully created");
            return new forumActions.CreateTopicSuccessAction();
          } else {
            throw Error("Operation Failed");
          }
        }),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  topicDetails$ = createEffect(() => this.actions$.pipe(
    ofType(forumActions.GET_TOPIC_DETAILS),
    mergeMap((action: forumActions.GetTopicDetailAction) => this.service.getOneTopic(action.payload)
      .pipe(
        map((result:any) => {
          if (!result.error) {
            return new forumActions.GetTopicDetailSuccessAction(result.data);
          } else {
            throw Error("Operation Failed");
          }
        }),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));
}
