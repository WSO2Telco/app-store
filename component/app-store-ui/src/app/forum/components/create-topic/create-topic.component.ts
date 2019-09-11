import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { CreateTopicParam } from "../../forum.data.models";
import * as forumActions from "../../forum.actions";
import { Actions } from "@ngrx/effects";
import { Router } from "@angular/router";

import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "store-create-topic",
  templateUrl: "./create-topic.component.html",
  styleUrls: ["./create-topic.component.scss"]
})
export class CreateTopicComponent implements OnInit {
  public topic: CreateTopicParam;

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.topic = new CreateTopicParam();

    this.store.dispatch(new globalActions.SetBreadcrumbAction([new BreadcrumbItem("Forum", "forum"), new BreadcrumbItem("Create New Topic")]));
    this.titleService.setTitle("Create New Topic | Apigate API Store");
  }

  onCreateClick() {
    // this.store.dispatch(new forumActions.CreateTopicAction(this.topic));

    // this.actions.ofType(forumActions.CREATE_TOPIC_SUCCESS).subscribe(() => {
    //   this.router.navigate(['forum']);
    // });
  }
}
