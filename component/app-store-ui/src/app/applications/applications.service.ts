
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import { GetApplicationsParam, Application, Subscription,
  ApplicationListResult, ApplicationDetails } from './applications.data.models';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationsService {

  private httpOptions;

  constructor(private http: HttpClient) {}

  getAllApplications(param: GetApplicationsParam): Observable<ApplicationListResult> {
    return this.http.get<ApplicationListResult>(ApiEndpoints.applications.getAllApplications);
  }

  getApplicationsDetails(appId: string): Observable<ApplicationDetails>{
    const endpoint = `${ApiEndpoints.applications.getAllApplications}/${appId}`;
    return this.http.get<ApplicationDetails>(endpoint);
  }

  getApplicationSubscriptions(param: Application) {
    return this.http.get<Subscription[]>(
      ApiEndpoints.applications.getSubscriptions,
      this.httpOptions
    ).pipe(map((res: any) => res.apis));
  }
}
