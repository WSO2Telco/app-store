import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { Topic, GetTopicsParam } from "../../forum.data.models";
import { MatTableDataSource } from "@angular/material";
import * as forumActions from "../../forum.actions";
import { Router } from "@angular/router";

@Component({
  selector: "store-forum-main",
  templateUrl: "./forum-main.component.html",
  styleUrls: ["./forum-main.component.scss"]
})
export class ForumMainComponent implements OnInit {
  public topics: Topic[];
  public searchQuery: string;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store.select(s => s.forum.allTopics).subscribe(res => {
      this.topics = res;
    });

    this.store.dispatch(
      new forumActions.GetAllTopicsAction(new GetTopicsParam())
    );
  }

  onSearchClick() {
    this.store.dispatch(
      new forumActions.GetAllTopicsAction({
        ...new GetTopicsParam(),
        search: this.searchQuery
      })
    );
  }

  onTopicDelete(id) {
    this.store.dispatch(new forumActions.DeleteTopicAction(id));
  }

  onTopicView(topic) {
    this.store.dispatch(new forumActions.SetSelectedTopicAction(topic));
    this.router.navigate(["forum/view-topic"]);
  }
}
