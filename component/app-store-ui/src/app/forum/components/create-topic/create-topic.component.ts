import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { CreateTopicParam } from "../../forum.data.models";
import * as forumActions from "../../forum.actions";
import { Actions, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";

import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { ApiSearchResult } from '../../../apis/apis.models';
import { take } from 'rxjs/operators';

@Component({
  selector: "store-create-topic",
  templateUrl: "./create-topic.component.html",
  styleUrls: ["./create-topic.component.scss"]
})
export class CreateTopicComponent implements OnInit {
  public topic: CreateTopicParam;

  public ckeConfig;
  public topicContent;

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.topic = new CreateTopicParam();

    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("Forum", "forum"), new BreadcrumbItem("Create New Topic")] }));
    this.titleService.setTitle("Create New Topic | Apigate API Store");

    this.ckeConfig = {
      extraPlugins: 'mentions',
      mentions: [{
        feed: ApiRepo.getApis,
        minChars: 0,
        outputTemplate: `<a class="mention" href="#/apis/detail/{id}">{name}</a>`,
        itemTemplate: '<li data-id="{id}">{name}</li>',
        marker: '@'
      }]
    }

    this.actions.pipe(ofType(forumActions.CreateTopicSuccessAction)).pipe(take(1)).subscribe(topic => {
      this.router.navigate(["/forum/view/", topic.payload.id]);
    })
  }

  onCreateClick() {
    if (this.topic.title && this.topic.title != '' && this.topic.content != '')
      this.store.dispatch(forumActions.CreateTopicAction({ payload: this.topic }));
  }

  public onChange({ editor }) {
    this.topic.content = editor.getData();
  }

}

export const ApiRepo = {
  getApis(opts, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let resp = JSON.parse(this.responseText);
          console.log(resp);
          callback(resp.list);
        } else {
          callback([]);
        }
      }
    }

    xhr.open('GET', '/api/am/store/v0.13/apis?query=' + encodeURIComponent(opts.query));
    xhr.send();
  }
}