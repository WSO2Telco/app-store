import { Component, OnInit } from "@angular/core";
import { Topic, TopicDetail } from "../../forum.data.models";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import * as forumActions from "../../forum.actions";

@Component({
  selector: "store-view-topic",
  templateUrl: "./view-topic.component.html",
  styleUrls: ["./view-topic.component.scss"]
})
export class ViewTopicComponent implements OnInit {
  public selectedTopic: Topic;
  public TopicDetail: TopicDetail;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(s => s.forum.topicDetail).subscribe(topic => {
      this.TopicDetail = topic;
    });

    this.store.select(s => s.forum.selectedTopic).subscribe(topic => {
      this.selectedTopic = topic;
      if (this.selectedTopic) {
        this.store.dispatch(
          new forumActions.GetTopicDetailAction(this.selectedTopic.topicId)
        );
      }
    });
  }
}
