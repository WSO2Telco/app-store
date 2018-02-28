import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import {
  GetApplicationsParam,
  Application,
  Subscription
} from './applications.data.models';

@Injectable()
export class ApplicationsService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAllApplications(param: GetApplicationsParam) {
    return this.http.post<Application[]>(
      ApiEndpoints.applications.getAllApplications,
      param,
      this.httpOptions
    );
  }

  getApplicationSubscriptions(param: Application) {
    return this.http.get<Subscription[]>(
      ApiEndpoints.applications.getSubscriptions,
      this.httpOptions
    ).map((res: any) => res.apis);
  }
}
