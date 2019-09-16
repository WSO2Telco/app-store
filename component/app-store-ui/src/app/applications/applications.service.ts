
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import { GetApplicationsParam, Application, Subscription,
  ApplicationListResult, ApplicationDetails, SubscriptionResult } from './applications.data.models';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationsService {

  constructor(private http: HttpClient) {}

  getAllApplications(param: GetApplicationsParam): Observable<ApplicationListResult> {
    return this.http.get<ApplicationListResult>(ApiEndpoints.applications.getAllApplications);
  }

  getApplicationsDetails(appId: string): Observable<ApplicationDetails>{
    const endpoint = `${ApiEndpoints.applications.getAllApplications}/${appId}`;
    return this.http.get<ApplicationDetails>(endpoint);
  }

  getApplicationSubscriptions(appId: string): Observable<SubscriptionResult> {
    const endpoint = `${ApiEndpoints.subscriptions}/?applicationId=${appId}`;
    return this.http.get<SubscriptionResult>(endpoint);
  }
}
