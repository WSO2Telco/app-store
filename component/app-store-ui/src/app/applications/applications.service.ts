
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import {
  GetApplicationsParam, Application, Subscription,
  ApplicationListResult, ApplicationDetails, SubscriptionResult, CreateApplicationParam, CreateAppResponseData,
} from './applications.data.models';
import { Observable } from 'rxjs';
import { TokenData } from '../authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.data.models';

@Injectable()
export class ApplicationsService {

  private accessToken: TokenData;

  constructor(private http: HttpClient, private store: Store<AppState>, private handler: HttpBackend) {
    this.store.select((s) => s.authentication.tokenDetails).subscribe((auth) => {
      this.accessToken = auth;
    })
  }

  getAllAvailableApplications(): Observable<ApplicationListResult> {
    return this.http.get<ApplicationListResult>(ApiEndpoints.applications.applications, {});
  }

  getAllApplications(param: GetApplicationsParam): Observable<ApplicationListResult> {
    const searchParams = new HttpParams()
      .append('limit', <any>param.limit)
      .append('offset', <any>param.offset)
      .append('query', <any>param.query);
    return this.http.get<ApplicationListResult>(ApiEndpoints.applications.applications, { params: searchParams });
  }

  getApplicationsDetails(appId: string): Observable<ApplicationDetails> {
    return this.http.get<ApplicationDetails>(`${ApiEndpoints.applications.applications}/${appId}`);
  }

  getApplicationSubscriptions(appId: string): Observable<SubscriptionResult> {
    return this.http.get<SubscriptionResult>(`${ApiEndpoints.subscriptions}/?applicationId=${appId}`);
  }

  createApplication(param: CreateApplicationParam): Observable<CreateAppResponseData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + this.accessToken.access_token
      })
    };

    return this.http.post(ApiEndpoints.applications.applications, param, httpOptions).pipe(
      map((data: any) => new CreateAppResponseData())
    );
  }

  updateApplication(appId, param: CreateApplicationParam): Observable<CreateAppResponseData> {
    return this.http.put(`${ApiEndpoints.applications.applications}/${appId}`, param).pipe(
      map((data: any) => new CreateAppResponseData())
    );
  }

  deleteApplication(appId): Observable<any> {
    return this.http.delete(`${ApiEndpoints.applications.applications}/${appId}`);
  }

  generateAppKey(appId, payload): Observable<any> {
    return this.http.post<any>(`${ApiEndpoints.applications.generateKeys}?applicationId=${appId}`, payload);
  }

  regenerateKeySecret(key): Observable<any> {
    let payload = { "consumerKey": key };
    return this.http.post<any>(`${ApiEndpoints.applications.regenerateSecret}`, payload);
  }

  updateAppKey(appId, keyObject): Observable<any> {
    var payload = (({ supportedGrantTypes, callbackUrl }) => ({ supportedGrantTypes, callbackUrl }))(keyObject);
    var endpoint = `${ApiEndpoints.applications.applications}/${appId}/keys/${keyObject.keyType}`;

    return this.http.put<any>(endpoint, payload);
  }

  regenerateAccessToken(payload): Observable<any> {
    const httpBasicClient: HttpClient = new HttpClient(this.handler);

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('scope', 'test')
      .set('validity_period', payload.validity)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + payload.auth
      })
    };
    return httpBasicClient.post<TokenData>(ApiEndpoints.authentication.tokenGeneration, body.toString(), httpOptions);
  }

  revokeAccessToken(payload): Observable<any>{
    const httpBasicClient: HttpClient = new HttpClient(this.handler);
    const revokeBody = new HttpParams()
      .set('token', payload.token)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + payload.auth
      })
    };

    return httpBasicClient.post(ApiEndpoints.authentication.tokenRevoke, revokeBody.toString(), httpOptions);
  }

}
