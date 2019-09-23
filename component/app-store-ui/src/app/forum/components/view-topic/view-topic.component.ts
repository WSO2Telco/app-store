import { Component, OnInit } from "@angular/core";
import { Topic, TopicDetail, Reply } from "../../forum.data.models";
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
  public topicDetail: TopicDetail;
  public topic:Topic;
  public replies:Reply[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(s => s.forum.topicDetail).subscribe(topic => {
      this.topicDetail = topic;
      if(this.topicDetail){
        this.topic = this.topicDetail.topic[0];
        this.replies = this.topicDetail.replies;
      }
    });

    // this.store.select(s => s.forum.selectedTopic).subscribe(topic => {
    //   this.selectedTopic = topic;
    //   if (this.selectedTopic) {
    //     this.store.dispatch(
    //       forumActions.GetTopicDetailAction({payload : this.selectedTopic.topicId})
    //     );
    //   }
    // });

    this.store.dispatch(forumActions.GetTopicDetailAction({payload:"topic123"}));
  }
}
