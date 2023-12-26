import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

import { CatchErrorService } from './catch-error.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root',
})
export class PushNotificationsService {
    sub$: any;
    constructor(
        private http: HttpClient,
        private catchError: CatchErrorService,
        private snackbarService: SnackbarService,
    ) {}
    public assingSubscription(sub: PushSubscription): void {
        this.sub$ = sub;
    }
    public addSubscription(): void {
        this.http
            .post(
                `${environment.serverPath}registrateUserPushSubscription`,
                { subscription: this.sub$ },
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }),
                },
            )
            .pipe(
                catchError(error => {
                    console.log(error);
                    this.snackbarService.openSnackbar(
                        'Push subscription error. Your subscription has not been registered',
                    );
                    return this.catchError.catchErrorHandler(error);
                }),
            )
            .subscribe(result => {
                console.log(result);
                this.snackbarService.openSnackbar('Push subscription has been registered');
            });
    }
    public sendMessage(message: string): void {
        this.http
            .post(
                `${environment.serverPath}sendNotification`,
                { message, subscription: this.sub$ },
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }),
                },
            )
            .pipe(
                catchError(error => {
                    console.log(error);
                    this.snackbarService.openSnackbar('Push notification error. Your message will not be sent!');
                    return this.catchError.catchErrorHandler(error);
                }),
            )
            .subscribe(result => {
                console.log(result);
                this.snackbarService.openSnackbar('Your message has been sent');
            });
    }
}
