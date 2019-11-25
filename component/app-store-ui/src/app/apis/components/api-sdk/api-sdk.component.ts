import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.data.models";
import { GetApiSdkAction } from '../../apis.actions';
import { sdkParam } from '../../apis.models';
import { Router, ActivatedRoute } from "@angular/router";
import { Actions, ofType } from '@ngrx/effects';
import * as apisActions from '../../apis.actions';

@Component({
  selector: 'store-api-sdk',
  templateUrl: './api-sdk.component.html',
  styleUrls: ['./api-sdk.component.scss']
})
export class ApiSdkComponent implements OnInit {
  api_id: string;
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private actions$: Actions, ) { }

  ngOnInit() {

    this.route.params.subscribe(p => {
      this.api_id = p['apiId'];
    })

    this.actions$.pipe(ofType(apisActions.GetApiSdkSuccessAction)).subscribe(p => {
      if (p) {
        console.log(p);
      }
    });
  }

  downloadSdk(lang: string) {
    this.store.dispatch(GetApiSdkAction({ "payload": new sdkParam(lang, this.api_id) }));

  }


}
