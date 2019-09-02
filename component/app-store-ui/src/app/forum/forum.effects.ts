
import {empty as observableEmpty,  Observable } from 'rxjs';

import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { ForumService } from "./forum.service";
import { Effect, Actions } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";
import * as forumActions from "./forum.actions";
import { GET_ALL_TOPICS, CreateTopicAction, GetTopicDetailSuccessAction } from './forum.actions';
import { TopicResult } from "./forum.data.models";
import { NotificationService } from "../shared/services/notification.service";

@Injectable()
export class ForumEffects {
  constructor(
    private service: ForumService,
    private notification: NotificationService,
    private actions$: Actions
  ) {}

  // @Effect()
  // allTopics$ = this.actions$
  //   .ofType(forumActions.GET_ALL_TOPICS).pipe(
  //   map((action: forumActions.GetAllTopicsAction) => action.payload),
  //   switchMap(param =>
  //     this.service
  //       .getAllTopics(param).pipe(
  //       map(
  //         (result: TopicResult) =>
  //           new forumActions.GetAllTopicsSuccessAction(result.data)
  //       ),
  //       catchError((e: HttpErrorResponse) => {
  //         this.notification.error(e.message);
  //         return observableEmpty();
  //       }),)
  //   ),);

  // @Effect()
  // deleteTopic$ = this.actions$
  //   .ofType(forumActions.DELETE_TOPIC).pipe(
  //   map((action: forumActions.DeleteTopicAction) => action.payload),
  //   switchMap(param =>
  //     this.service
  //       .deleteTopic(param).pipe(
  //       map((result: any) => {
  //         if (!result.error) {
  //           return new forumActions.GetAllTopicsAction();
  //         } else {
  //           throw Error("Operation Failed");
  //         }
  //       }),
  //       catchError((e: HttpErrorResponse) => {
  //         this.notification.error(e.message);
  //         return observableEmpty();
  //       }),)
  //   ),);

  // @Effect()
  // createTopic$ = this.actions$
  //   .ofType(forumActions.CREATE_TOPIC).pipe(
  //   map((action: forumActions.CreateTopicAction) => action.payload),
  //   switchMap(param =>
  //     this.service
  //       .createTopic(param).pipe(
  //       map((result: any) => {
  //         if (!result.error) {
  //           this.notification.success("Forum topic successfully created");
  //           return new forumActions.CreateTopicSuccessAction();
  //         } else {
  //           throw Error("Operation Failed");
  //         }
  //       }),
  //       catchError((e: HttpErrorResponse) => {
  //         this.notification.error(e.message);
  //         return observableEmpty();
  //       }),)
  //   ),);

  // @Effect()
  // topicDetails$ = this.actions$
  //   .ofType(forumActions.GET_TOPIC_DETAILS).pipe(
  //   map((action: forumActions.GetTopicDetailAction) => action.payload),
  //   switchMap(param =>
  //     this.service
  //       .getOneTopic(param).pipe(
  //       map((result: any) => {
  //         if (!result.error) {
  //           return new forumActions.GetTopicDetailSuccessAction(result.data);
  //         } else {
  //           throw Error("Operation Failed");
  //         }
  //       }),
  //       catchError((e: HttpErrorResponse) => {
  //         this.notification.error(e.message);
  //         return observableEmpty();
  //       }),)
  //   ),);
}
