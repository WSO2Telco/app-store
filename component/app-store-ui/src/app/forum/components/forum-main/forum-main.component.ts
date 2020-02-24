import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { GetTopicsParam, TopicResultPayload } from "../../forum.data.models";
import { MatDialog } from "@angular/material/dialog";
import * as forumActions from "../../forum.actions";
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { DeleteConfirmationDialog } from '../delete-confirmation/delete-confirmation';

@Component({
  selector: "store-forum-main",
  templateUrl: "./forum-main.component.html",
  styleUrls: ["./forum-main.component.scss"]
})
export class ForumMainComponent implements OnInit {
  public topics: TopicResultPayload;
  public searchQuery: string;

  constructor(
    private store: Store<AppState>, 
    private titleService: Title,
    public dialog: MatDialog ) {}

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
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result=="delete") this.store.dispatch(forumActions.DeleteTopicAction({payload:id}));
    });
  }
}