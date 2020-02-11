import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { Topic, GetTopicsParam, TopicResultPayload } from "../../forum.data.models";
import { MatTableDataSource, MatDialogRef, MatDialog } from "@angular/material";
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

  openDialog(id): void {
    
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
<div mat-dialog-content>
  <h2>Confirm Delete ?</h2>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()" cdkFocusInitial>Cancel</button>
  <button mat-button mat-dialog-close="delete">Delete</button>
</div>`,
})
export class DeleteConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}