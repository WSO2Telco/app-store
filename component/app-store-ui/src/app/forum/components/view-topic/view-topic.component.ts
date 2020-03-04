import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from "@angular/core";
import { Topic, TopicDetail, Reply, PostCommentParam } from "../../forum.data.models";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import * as forumActions from "../../forum.actions";
import { ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialog } from '../delete-confirmation/delete-confirmation';
import { take } from 'rxjs/operators';
import { getTopic } from '../../forum.reducer';

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

  public ckeConfig;
  public commentBody = new PostCommentParam();

  @ViewChild('topiccontainer') topiccontainer:ElementRef; 

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.store.select(getTopic).subscribe(topic => {
    //   this.topic = topic;
    //   this.cd.detectChanges();
    // });

    this.route.params.subscribe(params => {
      this.topicId = params['id'];
      this.commentBody.topicID = this.topicId;

      this.store.select(getTopic(this.topicId)).pipe(take(1)).subscribe(topic => {
        console.log("dispatch", this.topicId);
        if(topic) this.topic = topic;
        else this.store.dispatch(forumActions.GetTopicDetailAction({payload:this.topicId}));
        this.cd.detectChanges();
      });
    });

    this.ckeConfig = {
      toolbarGroups : [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'cleanup', 'basicstyles' ] },
        { name: 'paragraph', groups: [ 'indent', 'list', 'align', 'blocks', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
      ],
      removeButtons : 'Source,Save,Templates,Cut,Undo,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Outdent,Indent,CreateDiv,BidiLtr,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,Maximize,About,ShowBlocks,BGColor,Format,Font,FontSize,NewPage,Copy,Redo,Replace,Paste,PasteText,Print,Preview,PasteFromWord,RemoveFormat,CopyFormatting,NumberedList,BulletedList,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiRtl,Superscript'
    }

    this.actions$.pipe(ofType(forumActions.PostReplySuccessAction)).pipe(take(1)).subscribe(l => {
      this.commentBody.replyText = '';
      this.store.dispatch(forumActions.GetTopicDetailAction({payload:this.topicId}));
      console.log(this.topicId);
    })

    this.actions$.pipe(ofType(forumActions.DeleteCommentSuccessAction)).subscribe(l => {
      this.store.dispatch(forumActions.GetTopicDetailAction({payload:this.topicId}));
    })
  }

  ngAfterViewInit(){
    this.topiccontainer.nativeElement.scrollTo(0, 0);
  }

  getFirstLetter(name:string): string {
    return (name != '') ? name.charAt(0) : null;
  }

  postComment(){
    if(this.commentBody.replyText != '')
    this.store.dispatch(forumActions.PostReplyAction({payload: this.commentBody}));
  }

  deleteComment(id){
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result=="delete") this.store.dispatch(forumActions.DeleteCommentAction({payload:id}));
    });
  }
}