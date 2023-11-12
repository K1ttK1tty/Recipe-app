import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private SnackbarService: SnackbarService,
    ) {}
    private isUserAuthorized = new BehaviorSubject(false);
    readonly getAuthState = this.isUserAuthorized.asObservable();
    public authorize() {
        this.isUserAuthorized.next(true);
    }
    public unAuthorize() {
        this.isUserAuthorized.next(false);
    }
    public registration(name: string, email: string, password: string) {
        return this.http
            .post('http://localhost:5001/api/registration', { userName: name, email, password })
            .pipe(
                catchError(error => {
                    return this.catchErrorHandler(error);
                }),
            )
            .subscribe(resp => {
                this.SnackbarService.openSnackbar('Registration completed successfully');
            });
    }
    public login(email: string, password: string) {
        return this.http
            .post('http://localhost:5001/api/login', { email, password })
            .pipe(
                catchError(error => {
                    return this.catchErrorHandler(error);
                }),
            )
            .subscribe(() => {

                this.SnackbarService.openSnackbar('You are logged into your account');
                this.authorize();

            });
    }
    private catchErrorHandler(error: HttpErrorResponse) {
        let message: string;
        if (error.status === 0) {
            message = 'An error occured';
            console.error('An error occured:', error.error);
        } else {
            message = `Backend returned error code - ${error.status}`;
            console.error(`Backend returned error code - ${error.status}`);
        }
        return throwError(() => {
            this.SnackbarService.openSnackbar(message);
            return new Error('Something went wrong. Please try again later.');
        });
    }
}
