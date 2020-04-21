import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { TokenData } from '../authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.data.models';
import { catchError } from "rxjs/operators";
import * as loginActions from "../authentication/authentication.actions";


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private tokenData: TokenData;

    constructor(private store: Store<AppState>) {
        this.store.select((s) => s.authentication.tokenDetails).subscribe((token) => {
            this.tokenData = token;
        })
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = request.url;
        if (this.tokenData && !url.includes('change-password-by-user')) {
            let token = this.tokenData.access_token;
            request = request.clone({
                withCredentials: true,
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(request);

       /*  return next.handle(request).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    this.store.dispatch(loginActions.DoLogoutAction());
                    return new Observable<HttpEvent<any>>();
                } else{
                    return throwError(err);
                }
            })
        ); */
    }
}