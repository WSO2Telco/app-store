import { Component, OnInit, Input } from '@angular/core';
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { GetApiTagAction } from '../../apis.actions';
import { Actions, ofType } from '@ngrx/effects';
import * as apisActions from '../../apis.actions';
import { TagListResult } from '../../apis.models';
import { Router } from "@angular/router";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'store-api-tag',
  templateUrl: './api-tag.component.html',
  styleUrls: ['./api-tag.component.scss']
})
export class ApiTagComponent implements OnInit {
  tagList: TagListResult;
  data: CloudData[] = [];

  constructor(private store: Store<AppState>, private actions$: Actions, private router: Router, private dialogRef: MatDialogRef<ApiTagComponent>) {
    this.store.dispatch(GetApiTagAction({}));

  }

  ngOnInit() {

  }

  ngAfterContentChecked() {
    this.actions$.pipe(ofType(apisActions.GetApiTagSuccessAction)).subscribe(p => {
      if (p) {
        this.tagList = p.payload;
        var result = this.tagList.list.map(tagArr => ({ text: tagArr.name, weight: tagArr.weight, tooltip: tagArr.name }));
        this.data = result;
      }
    })
  }

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width: 450,
    height: 300,
    overflow: false,
    randomizeAngle: true
  };

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.2 // Zoom will take affect after 0.8 seconds
  };

  logClicked(clicked: CloudData) {
    this.dialogRef.close();
    this.router.navigate([`/apis/filter/${clicked.text}`]);
  }


}
