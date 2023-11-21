import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const customReq = req.clone({ withCredentials: true });
        // console.log(customReq);
        return next.handle(customReq).pipe(
            tap({
                // next: event => console.log(event),
                // error: event => console.error(event),
            }),
            finalize(() => {
                // console.log(customReq);
            }),
        );
    }
}
