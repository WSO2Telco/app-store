import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { CreateTopicParam } from "../../forum.data.models";
import * as forumActions from "../../forum.actions";
import { Actions } from "@ngrx/effects";
import { Router } from "@angular/router";
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
    private router: Router
  ) {}

  ngOnInit() {
    this.topic = new CreateTopicParam();
  }

  onCreateClick() {
    this.store.dispatch(new forumActions.CreateTopicAction(this.topic));

    this.actions.ofType(forumActions.CREATE_TOPIC_SUCCESS).subscribe(() => {
      this.router.navigate(['forum']);
    });
  }
}
