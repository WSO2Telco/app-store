import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import {
    ApiSearchParam, ApiSearchResult, ApplicationsResult,
    SubscribeParam, SubscribeResult, ApiOverview, TagListResult, sdkParam, AddNewSubsParam
} from './apis.models';
import { NotificationService } from '../shared/services/notification.service';
import { ApplicationDetails } from '../applications/applications.data.models';

@Injectable()
export class ApisService {

    constructor(
        private http: HttpClient, 
        private handler: HttpBackend,
        private notification: NotificationService
    ) { }

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

    getApiSdk(param: sdkParam) {
        let data = '?apiId=' + param.apiId + '&language=' + param.lang;

        let body = { filename: param.apiId };

        this.http.post(
            ApiEndpoints.apis.sdk + data,
            body,
            {
                responseType: "blob",
                headers: new HttpHeaders().append("Content-Type", "application/json")
            }
        ).subscribe(
            data => {
                let blob = new Blob([data], { type: "application/zip" });
                let url = window.URL.createObjectURL(blob);
                let pwa = window.open(url);
                if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
                    this.notification.error("Please disable your Pop-up blocker and try again.");
                }
            },
            err => {
                this.notification.error("Error : No SDK found for "+param.lang);
            }
        );;
    }

    newApiSubscription(param: AddNewSubsParam): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(ApiEndpoints.apis.applications, param, httpOptions)
    }


    updateAppKey(appId, keyObject): Observable<any> {
        var payload = (({ supportedGrantTypes, callbackUrl }) => ({ supportedGrantTypes, callbackUrl }))(keyObject);
        var endpoint = `${ApiEndpoints.applications.applications}/${appId}/keys/${keyObject.keyType}`;

        return this.http.put<any>(endpoint, payload);
    }

    getAvailableApplications(): Observable<any> {
        return this.http.get<any>(ApiEndpoints.apis.availableApp);
    }

    getSelectedAppDetails(appId: string): Observable<ApplicationDetails> {
        return this.http.get<ApplicationDetails>(`${ApiEndpoints.applications.applications}/${appId}`);
      }

    deleteSubscription(subscriptionId): Observable<any> {
        return this.http.delete(`${ApiEndpoints.apis.applications}/${subscriptionId}`);
    }

    searchForum(searchTerm: string) {
        let url = `${ApiEndpoints.forum.search}/${encodeURI(searchTerm)}`;
        return this.http.get(url);
    }
}