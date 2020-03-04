import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { MatTableDataSource } from "@angular/material/table";
import { Topic, GetTopicsParam } from "../../forum.data.models";
import { Router, ActivatedRoute } from '@angular/router';
import { GetAllTopicsAction } from '../../forum.actions';
import { getTopics, AppState } from '../../forum.reducer';

@Component({
  selector: "store-topic-result",
  templateUrl: "./topic-result.component.html",
  styleUrls: ["./topic-result.component.scss"]
})
export class TopicResultComponent implements OnInit {
  @Output() whenDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() whenView: EventEmitter<Topic> = new EventEmitter<Topic>();

  dataSource = new MatTableDataSource<Topic>();
  totalTopics = 0;
  pageSize = 10;
  pageId = 0;
  @ViewChild('paginator') paginator;

  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.select(s => s.forum).subscribe(res => {
      this.totalTopics = res.totalTopics;
      this.cd.detectChanges();
    });

    this.store.select(getTopics).subscribe(res => {
        this.dataSource.data = res;
        this.cd.detectChanges();
    });

    this.route.params.subscribe(params => {
      if(params['pageId']) this.pageId = params['pageId']*1-1;
      let getTopicsParam = new GetTopicsParam()
      getTopicsParam.page = this.pageId;

      this.paginator.pageIndex = this.pageId;

      this.store.select((s) => s.authentication.tokenDetails).subscribe((auth) => {
        if(auth) this.store.dispatch(GetAllTopicsAction({payload: getTopicsParam}));
        this.cd.detectChanges();
      })

    });
  }

  onTopicAction(element, action) {
    if (action === "delete") {
      this.whenDelete.emit(element.id);
    }
    if(action ==='view'){
      this.router.navigate(["/forum/view/"+element.id]);
    }
  }

  changePage(e){
    let page = e.pageIndex+1;
    let url = (page > 1) ? `/forum/page/${page}` : `/forum`;
    this.router.navigate([url]);
  }
}
