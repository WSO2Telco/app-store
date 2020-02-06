import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Topic, TopicDetail, Reply } from "../../forum.data.models";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import * as forumActions from "../../forum.actions";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "store-view-topic",
  templateUrl: "./view-topic.component.html",
  styleUrls: ["./view-topic.component.scss"]
})
export class ViewTopicComponent implements OnInit {
  public selectedTopic: Topic;
  // public topicDetail: TopicDetail;
  public topic:Topic;
  public replies:Reply[];
  public topicId:string;

  constructor(
    private store: Store<AppState>, 
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.select(s => s.forum.topicDetail).subscribe(topic => {
      this.topic = topic;
      this.cd.detectChanges();
    });

    this.route.params.subscribe(params => {
      this.topicId = params['id'];
      this.store.dispatch(forumActions.GetTopicDetailAction({payload:this.topicId}));
   });
  }

  getFirstLetter(name:string): string {
    return (name != '') ? name.charAt(0) : null;
  }
}