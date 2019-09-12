
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import {
  GetApplicationsParam,
  Application,
  Subscription
} from './applications.data.models';
import { TokenData } from '../authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.data.models';

@Injectable()
export class ApplicationsService {

  private tokenData:TokenData;
  private httpOptions;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select((s) => s.authentication.tokenDetails).subscribe((token) => {
      this.tokenData = token;
    })

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${this.tokenData.access_token}`,
      })
    };
    // ToDo : Move this to separate interceptor
  }

  getAllApplications(param: GetApplicationsParam) {
    return this.http.get(
      ApiEndpoints.applications.getAllApplications,
      this.httpOptions
    );
  }

  getApplicationSubscriptions(param: Application) {
    return this.http.get<Subscription[]>(
      ApiEndpoints.applications.getSubscriptions,
      this.httpOptions
    ).pipe(map((res: any) => res.apis));
  }
}
