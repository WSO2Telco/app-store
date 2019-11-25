import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import {
    ApiSearchParam, ApiSearchResult, Application, ApplicationSearchParam, ApplicationsResult,
    SubscribeParam, SubscribeResult, ApiOverview, TagListResult, sdkParam
} from './apis.models';



@Injectable()
export class ApisService {

    constructor(private http: HttpClient, private handler: HttpBackend) { }

    search(param: ApiSearchParam): Observable<any> {
        const searchParams = new HttpParams()
            .append('apiStatus', param.apiStatus)
            .append('query', param.query)
            .append('limit', <any>param.limit)
            .append('offset', <any>param.offset);
        const headerParams = new HttpHeaders()
            .append('Content-Type', 'application/json')
        return this.http.get<ApiSearchResult>(ApiEndpoints.apis.search, { params: searchParams, headers: headerParams });
    }

    getUserApplicationsActions(appId: string): Observable<ApplicationsResult> {
        const searchParams = new HttpParams()
            .append('apiId', appId);
        return this.http.get<ApplicationsResult>(ApiEndpoints.apis.applications, { params: searchParams });
    }

    getUserSubscriptions(appId: string): Observable<any> {
        const searchParams = new HttpParams()
            .append('apiId', appId);
        return this.http.get<any>(ApiEndpoints.subscriptions, { params: searchParams });
    }

    subscribe(param: SubscribeParam): Observable<SubscribeResult> {
        return this.http.get<SubscribeResult>(ApiEndpoints.apis.subscribe);
    }

    getApiOverview(param): Observable<ApiOverview> {
        return this.http.get<ApiOverview>(ApiEndpoints.apis.apiOverview + param);
    }

    getApiTag(): Observable<any> {
        return this.http.get<TagListResult>(ApiEndpoints.apis.tag);
    }

    getApiSdk(param: sdkParam): Observable<any> {
        /*  const sdkp = new HttpParams()
             .append('apiId', param.apiId)
             .append('lang', param.lang)
  */
        let data = '?apiId=' + param.apiId + '&language=' + param.lang;

        const headerParams = new HttpHeaders()
            .append('Content-Type', 'application/json')
        return this.http.post<any>(ApiEndpoints.apis.sdk + data, headerParams);
    }


    updateAppKey(appId, keyObject): Observable<any> {
        var payload = (({ supportedGrantTypes, callbackUrl }) => ({ supportedGrantTypes, callbackUrl }))(keyObject);
        var endpoint = `${ApiEndpoints.applications.applications}/${appId}/keys/${keyObject.keyType}`;

        return this.http.put<any>(endpoint, payload);
    }

}