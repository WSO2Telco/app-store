import { Component, OnInit } from '@angular/core';
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { GetApiTagAction } from '../../apis.actions';
import { Actions, ofType } from '@ngrx/effects';
import * as apisActions from '../../apis.actions';
import { TagListResult } from '../../apis.models';
import { Router } from "@angular/router";
import { MatDialogRef } from '@angular/material/dialog';
declare var Clouder: any;

@Component({
  selector: 'store-api-tag',
  templateUrl: './api-tag.component.html',
  styleUrls: ['./api-tag.component.scss']
})
export class ApiTagComponent implements OnInit {
  tagList: TagListResult;
  data: any = [];
  isTagAvailable: boolean;

  constructor(private store: Store<AppState>, private actions$: Actions, private router: Router, private dialogRef: MatDialogRef<ApiTagComponent>) {
    this.store.dispatch(GetApiTagAction({}));

  }

  ngOnInit() {
  }

  init() {
    var w = Math.max(window.innerWidth, document.body.clientWidth), h = Math.max(window.innerHeight, document.body.clientHeight);
    var clouder = document.getElementById('clouder');

    clouder.style.width = this.asPixels(w * 2 / 3);
    clouder.style.height = this.asPixels(h * 2 / 3);
    clouder.style.position = "absolute";
    clouder.style.left = this.asPixels(w / 6);
    clouder.style.top = this.asPixels(h / 6);

    var params: {
      colorMin: "#0000FF",
      colorMax: "#FF0000",
      colorBgr: "#FFFFFF",
      interval: 50,
      fontSize: 12,
      fontShift: 4,
      opaque: 0.3
    }

    clouder = new Clouder({
      container: clouder,
      tags: this.createTags(this.data),
      callback: (data) => {
        this.logClicked(data);
      }
    });
  } // init

  asPixels(number) {
    return number + 'px';
  } // asPixels

  createTags(elems: any) {
    return elems;
  }

  ngAfterContentChecked() {
    this.actions$.pipe(ofType(apisActions.GetApiTagSuccessAction)).subscribe(p => {
      if (p) {
        this.tagList = p.payload;
        var result = this.tagList.list.map(tagArr => ({ text: tagArr.name, weight: tagArr.weight, id: tagArr.name }));
        this.data = result;
        this.isTagAvailable = true;
      }
    })

    if (this.isTagAvailable) {
      this.isTagAvailable = false;
      this.init();
    }
  }

  logClicked(clicked: any) {
    this.dialogRef.close();
    this.router.navigate([`/apis/filter/${clicked}`]);
  }


}
