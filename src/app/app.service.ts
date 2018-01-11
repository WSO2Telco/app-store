import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from './config/api.endpoints';
import { Observable } from 'rxjs/Observable';
import { Country } from './app.models';
import 'rxjs/add/observable/from';


@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(ApiEndpoints.global.countries);
    }
}
