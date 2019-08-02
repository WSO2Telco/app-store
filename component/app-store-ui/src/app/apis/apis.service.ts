import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
    ApiSearchParam, ApiSearchResult, Application, ApplicationSearchParam, ApplicationsResult,
    SubscribeParam, SubscribeResult, ApiOverview
} from './apis.models';



@Injectable()
export class ApisService {

    constructor(private http: HttpClient) { }

    search(param: ApiSearchParam): Observable<any> {
        const searchParams = new HttpParams()
            .append('tag', param.tag)
            .append('apiStatus', param.apiStatus)
            .append('page', <any>param.page)
            .append('query', param.query);
        return this.http.get<ApiSearchResult>(ApiEndpoints.apis.search, { params: searchParams });
    }

    getUserApplicationsActions(param: ApplicationSearchParam): Observable<ApplicationsResult> {
        const searchParams = new HttpParams()
            .append('action', param.action);
        return this.http.get<ApplicationsResult>(ApiEndpoints.apis.applications, { params: searchParams });
    }

    subscribe(param: SubscribeParam): Observable<SubscribeResult> {
        return this.http.get<SubscribeResult>(ApiEndpoints.apis.subscribe);
    }

    getApiOverview(param): Observable<ApiOverview> {
        return this.http.get<ApiOverview>(ApiEndpoints.apis.apiOverview);
    }

}
