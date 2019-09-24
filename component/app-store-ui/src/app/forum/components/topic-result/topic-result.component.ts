import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { MatTableDataSource } from "@angular/material";
import { Topic } from "../../forum.data.models";

@Component({
  selector: "store-topic-result",
  templateUrl: "./topic-result.component.html",
  styleUrls: ["./topic-result.component.scss"]
})
export class TopicResultComponent implements OnInit {
  @Output() whenDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() whenView: EventEmitter<Topic> = new EventEmitter<Topic>();

  dataSource = new MatTableDataSource<Topic>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(s => s.forum.allTopics).subscribe(res => {
      this.dataSource.data = res;
    });
  }

  onTopicAction(element, action) {
    if (action === "delete") {
      this.whenDelete.emit(element.topicId);
    }
    if(action ==='view'){
      this.whenView.emit(element);
    }
  }
}
