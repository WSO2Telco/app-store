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
import { ApiSearchResult } from '../../../apis/apis.models';

@Component({
  selector: "store-create-topic",
  templateUrl: "./create-topic.component.html",
  styleUrls: ["./create-topic.component.scss"]
})
export class CreateTopicComponent implements OnInit {
  public topic: CreateTopicParam;

  public ckeConfig;
  public apiList;
  
  public topicContent;

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.topic = new CreateTopicParam();

    this.store.dispatch(globalActions.SetBreadcrumbAction({payload:[new BreadcrumbItem("Forum", "forum"), new BreadcrumbItem("Create New Topic")]}));
    this.titleService.setTitle("Create New Topic | Apigate API Store");

    this.ckeConfig = {
      extraPlugins : 'mentions',
      mentions: [ { 
        feed: ApiRepo.getApis, 
        minChars: 0,
        outputTemplate : `<a class="mention" href="#/apis/detail/{id}">{name}</a>`,
        itemTemplate : '<li data-id="{id}">{name}</li>',
        marker: '@'
      } ]
    }

    this.store
      .select(s => s.apis.apiSearchResult)
      .subscribe((res: ApiSearchResult) => {
        ApiRepo.list = res.list;
      });
  }

  onCreateClick() {
    // this.store.dispatch(new forumActions.CreateTopicAction(this.topic));

    // this.actions.ofType(forumActions.CREATE_TOPIC_SUCCESS).subscribe(() => {
    //   this.router.navigate(['forum']);
    // });
  }

  public onChange( { editor }) {
    this.topicContent = editor.getData();
  }
  
}

export const ApiRepo = {
  list : null,
  getApis(opts, callback) {
    if(ApiRepo.list){
      var matchProperty = 'name',
      data = ApiRepo.list.filter(function(item) {
        return item[matchProperty].toLowerCase().indexOf(opts.query.toLowerCase()) == 0;
      });

      data = data.sort(function(a, b) {
        return a[matchProperty].localeCompare(b[matchProperty], undefined, {
          sensitivity: 'accent'
        });
      });

      callback(data);
    }
  }
}