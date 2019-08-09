
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiEndpoints } from '../config/api.endpoints';

import { LoginFormData, LoginResponseData, LogoutResponseData } from './authentication.models';
import { AppState } from '../app.data.models';
import { Store } from '@ngrx/store';
import { SigUpUserParam, ResetPasswordParam } from './authentication.data.models';

@Injectable()
export class AuthenticationService {

    private loginData:LoginResponseData;

    constructor(private http: HttpClient,private store:Store<AppState>) { 
        this.store.select((s)=> s.authentication.loginData).subscribe((auth)=>{
            this.loginData = auth;
        })
    }

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

        return this.http.get(ApiEndpoints.authentication.login, httpOptions).pipe(
            map((data: any) =>
                new LoginResponseData(param.username, {}, data.error, data.message)
            ));
    }

    logout(): Observable<LogoutResponseData> {
        const body: HttpParams = new HttpParams()
            .set('action', 'logout');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        return this.http.get(ApiEndpoints.authentication.logout, httpOptions).pipe(
            map((data: any) => new LogoutResponseData(data)));
    }

    signup(param:SigUpUserParam){
        return this.http.get(ApiEndpoints.authentication.signup);
    }
 
    changePassword(param:ResetPasswordParam){
        return this.http.get(ApiEndpoints.authentication.changePassword);
    }

    isLoggedIn(){
        return !!this.loginData;
    }
}
