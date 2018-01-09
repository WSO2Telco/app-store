import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiSearchParam, ApiSearchResult } from './apis.models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApisService {

    constructor(private http: HttpClient) { }

    search(param: ApiSearchParam): Observable<any> {
        const searchParams = new HttpParams();
        searchParams.append('tag', param.tag);
        searchParams.append('apiStatus', param.apiStatus);
        searchParams.append('page', <any>param.page);
        searchParams.append('query', param.query);

        return this.http.get<ApiSearchResult>(ApiEndpoints.apis.search, { params: searchParams });
    }

}
