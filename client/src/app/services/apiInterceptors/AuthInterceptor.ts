import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

import { LoadingService } from '../loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}
    requestsNumber = 0;
    completedRequestsNumber = 0;
    addCredentialsFlag = false;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requestsNumber++;
        if (environment.urlWithCredentials.includes(req.url)) {
            this.addCredentialsFlag = true;
        }
        const customReq = req.clone({ withCredentials: this.addCredentialsFlag });
        this.loadingService.showLoading();
        return next.handle(customReq).pipe(
            tap({
                next: value => {
                    if (value instanceof HttpResponse) {
                    }
                },
                error: () => {},
            }),
            finalize(() => {
                this.completedRequestsNumber++;

                if (this.completedRequestsNumber === this.requestsNumber) {
                    this.loadingService.hideLoading();
                    this.requestsNumber = 0;
                    this.completedRequestsNumber = 0;
                }
            }),
        );
    }
}
