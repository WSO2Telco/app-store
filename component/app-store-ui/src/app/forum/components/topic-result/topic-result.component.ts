import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Topic } from "../../forum.data.models";

@Component({
  selector: "store-topic-result",
  templateUrl: "./topic-result.component.html",
  styleUrls: ["./topic-result.component.scss"]
})
export class TopicResultComponent implements OnInit, OnChanges {
  @Input() topics: Topic[];

  @Output() whenDelete: EventEmitter<string> = new EventEmitter<string>();

  dataSource = new MatTableDataSource<Topic>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.topics) {
      this.dataSource.data = this.topics;
    }
  }

  onTopicAction(element, action) {
    if (action === "delete") {
      this.whenDelete.emit(element.topicId);
    }
  }
}
