import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { TokenData } from '../authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.data.models';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private tokenData: TokenData;

    constructor( private store: Store<AppState> ) {
        this.store.select((s) => s.authentication.tokenDetails).subscribe((token) => {
            this.tokenData = token;
        })
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.tokenData) {
            let token = this.tokenData.access_token ;
            request = request.clone({
                withCredentials : true,
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}