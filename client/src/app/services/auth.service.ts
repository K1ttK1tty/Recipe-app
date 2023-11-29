import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { ILogin, IUser, IUserInfo } from '../models/UserModel';

import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private SnackbarService: SnackbarService,
        private router: Router,
    ) {}
    private isUserAuthorized = new BehaviorSubject(false);
    private user = new BehaviorSubject<IUser | {}>({});
    public getUser() {
        return this.user.asObservable() as BehaviorSubject<IUser>;
    }
    public updateUser(data: IUser) {
        this.user.next(data);
    }
    readonly getAuthState = this.isUserAuthorized.asObservable();
    public authorize() {
        this.isUserAuthorized.next(true);
    }
    public unAuthorize() {
        this.isUserAuthorized.next(false);
    }
    public registration(name: string, email: string, password: string, captchaToken: string) {
        return this.http
            .post('http://localhost:5001/api/registration', { userName: name, email, password, captchaToken })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.SnackbarService.openSnackbar(error.error.message);
                    return this.catchErrorHandler(error);
                }),
            )
            .subscribe(() => {
                this.SnackbarService.openSnackbar('Registration completed successfully');
            });
    }
    public login(email: string, password: string, captchaToken: string) {
        return this.http
            .post<ILogin>('http://localhost:5001/api/login', { email, password, captchaToken })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.SnackbarService.openSnackbar(error.error.message);
                    return this.catchErrorHandler(error);
                }),
            )
            .subscribe(resp => {
                this.SnackbarService.openSnackbar('You are logged into your account');
                this.authorize();
                localStorage.setItem('token', resp.accessToken);

                this.user.next(resp.user);
                this.router.navigate(['/profile']);
            });
    }
    public logOut(captchaToken: string) {
        this.http
            .post('http://localhost:5001/api/logout', { captchaToken })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.SnackbarService.openSnackbar(error.error.message);
                    return this.catchErrorHandler(error);
                }),
            )
            .subscribe(() => {
                this.SnackbarService.openSnackbar('You are logged out');
                this.unAuthorize();
                this.user.next({});
                this.router.navigate(['/']);
            });
    }
    public refresh() {
        return this.http
            .get<ILogin>('http://localhost:5001/api/refresh')
            .pipe(
                catchError(error => {
                    return this.catchErrorHandler(error);
                }),
            )
            .subscribe(resp => {
                this.SnackbarService.openSnackbar('You are logged into your account');
                this.authorize();
                this.user.next(resp.user);
                localStorage.setItem('token', resp.accessToken);
            });
    }

    private catchErrorHandler(error: HttpErrorResponse) {
        let message = error.error.message ? (error.error.message as string) : '';
        if (!message) {
            if (error.status === 0) {
                message = 'An error occured';
                console.error('An error occured:', error.error);
            } else {
                message = `Backend Error - ${error.status}`;
                console.error(`Backend returned error code - ${error.status}`);
            }
        }
        return throwError(() => {
            this.SnackbarService.openSnackbar(message);
            return new Error('Something went wrong. Please try again later.');
        });
    }
    public uploadData(email: string, name: string, userInfo: IUserInfo) {
        this.http
            .post(
                'http://localhost:5001/api/uploadData',
                { email, name, userInfo },
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }),
                },
            )
            .pipe(
                catchError(err => {
                    return this.catchErrorHandler(err);
                }),
            )
            .subscribe(() => {
                this.SnackbarService.openSnackbar('Your information has been updated');
            });
    }
}
