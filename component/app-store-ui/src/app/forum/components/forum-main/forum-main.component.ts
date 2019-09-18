import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { Topic, GetTopicsParam } from "../../forum.data.models";
import { MatTableDataSource } from "@angular/material";
import * as forumActions from "../../forum.actions";
import { Router } from "@angular/router";
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "store-forum-main",
  templateUrl: "./forum-main.component.html",
  styleUrls: ["./forum-main.component.scss"]
})
export class ForumMainComponent implements OnInit {
  public topics: Topic[];
  public searchQuery: string;

  constructor(private store: Store<AppState>, private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.store.select(s => s.forum.allTopics).subscribe(res => {
      this.topics = res;
    });

    this.store.dispatch(
      forumActions.GetAllTopicsAction({payload: new GetTopicsParam()})
    );

    this.store.dispatch(globalActions.SetBreadcrumbAction({payload:[new BreadcrumbItem("Forum")]}));
    this.titleService.setTitle("Forum | Apigate API Store");
  }

  onSearchClick() {
    this.store.dispatch(
      forumActions.GetAllTopicsAction({payload:
        {
          ...new GetTopicsParam(),
          search: this.searchQuery
        }})
    );
  }

  onTopicDelete(id) {
    this.store.dispatch(forumActions.DeleteTopicAction({payload:id}));
  }

  onTopicView(topic) {
    this.router.navigate(["forum/view-topic"]);
  }
}
