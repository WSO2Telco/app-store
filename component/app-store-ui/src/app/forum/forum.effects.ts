
import { Injectable } from "@angular/core";
import { ForumService } from "./forum.service";
import { HttpErrorResponse } from "@angular/common/http";
import * as forumActions from "./forum.actions";
import { TopicResult, GetTopicsParam } from "./forum.data.models";
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
    ofType(forumActions.GetAllTopicsAction),
    mergeMap(({payload}) => this.service.getAllTopics(payload)
      .pipe(
        map((result: TopicResult) => (forumActions.GetAllTopicsSuccessAction({payload:result.payload}))),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  deleteTopic$ = createEffect(() => this.actions$.pipe(
    ofType(forumActions.DeleteTopicAction),
    mergeMap(({payload}) => this.service.deleteTopic(payload)
      .pipe(
        map((result:any) => {
          if (!result.error) return forumActions.GetAllTopicsAction({payload : new GetTopicsParam});
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
    ofType(forumActions.CreateTopicAction),
    mergeMap(({payload}) => this.service.createTopic(payload)
      .pipe(
        map((result:any) => {
          if (result.success) {
            this.notification.success("Forum topic successfully created");
            return forumActions.CreateTopicSuccessAction({payload:result.payload});
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
    ofType(forumActions.GetTopicDetailAction),
    mergeMap(({payload}) => this.service.getOneTopic(payload)
      .pipe(
        map((result:any) => {
          if (!result.error) {
            return forumActions.GetTopicDetailSuccessAction({payload:result.payload});
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
