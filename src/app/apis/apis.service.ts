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
        const searchParams = new HttpParams()
            .append('tag', param.tag)
            .append('apiStatus', param.apiStatus)
            .append('page', <any>param.page)
            .append('query', param.query);
        return this.http.get<ApiSearchResult>(ApiEndpoints.apis.search, { params: searchParams });
    }

}
