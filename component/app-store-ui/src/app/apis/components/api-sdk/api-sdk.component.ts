import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.data.models";
import { sdkParam } from '../../apis.models';
import { Router, ActivatedRoute } from "@angular/router";
import { Actions, ofType } from '@ngrx/effects';
import { ApisService } from '../../apis.service';

@Component({
    selector: 'store-api-sdk',
    templateUrl: './api-sdk.component.html',
    styleUrls: ['./api-sdk.component.scss']
})
export class ApiSdkComponent implements OnInit {
    api_id: string;
    constructor(
        private store: Store<AppState>, 
        private route: ActivatedRoute, 
        private router: Router, 
        private actions$: Actions, 
        private apiSvc: ApisService
    ) { }

    ngOnInit() {

        this.route.params.subscribe(p => {
            this.api_id = p['apiId'];
        })
    }

    downloadSdk(lang: string) {
        this.apiSvc.getApiSdk( new sdkParam(lang, this.api_id) )
    }


}
