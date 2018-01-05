import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginFormData, LoginResponseData, LogoutResponseData } from './authentication.models';

@Injectable()
export class AuthenticationService {

    private endPoints = {
        login: '../store/site/blocks/user/login/ajax/login.jag',
        logout: '../store/site/blocks/user/login/ajax/login.jag'
    };

    constructor(private http: HttpClient) { }

    login(param: LoginFormData): Observable<LoginResponseData> {
        const body: HttpParams = new HttpParams()
            .set('action', 'login')
            .set('username', param.username)
            .set('password', param.password)
            .set('tenant', null);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        return this.http.post(this.endPoints.login, body.toString(), httpOptions)
            .map((data: any) =>
                new LoginResponseData(param.username, {}, data.error, data.message)
            );
    }



    logout(): Observable<LogoutResponseData> {
        const body: HttpParams = new HttpParams()
            .set('action', 'logout');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        return this.http.post(this.endPoints.logout, body.toString(), httpOptions)
            .map((data: any) => new LogoutResponseData(data));
    }
}
