import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { ILogin, IUser, IUserInfo } from '../models/UserModel';

import { CatchErrorService } from './catch-error.service';
import { SnackbarService } from './snackbar.service';
import { environment } from 'src/enviroment/enviroment';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private SnackbarService: SnackbarService,
        private router: Router,
        private catchError: CatchErrorService,
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
            .post(`${environment.serverPath}registration`, { userName: name, email, password, captchaToken })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.SnackbarService.openSnackbar(error.error.message);
                    return this.catchError.catchErrorHandler(error);
                }),
            )
            .subscribe(() => {
                this.SnackbarService.openSnackbar('Registration completed successfully');
            });
    }
    public login(email: string, password: string, captchaToken: string) {
        return this.http
            .post<ILogin>(`${environment.serverPath}login`, { email, password, captchaToken })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.SnackbarService.openSnackbar(error.error.message);
                    return this.catchError.catchErrorHandler(error);
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
            .post(`${environment.serverPath}logout`, { captchaToken })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.SnackbarService.openSnackbar(error.error.message);
                    return this.catchError.catchErrorHandler(error);
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
            .get<ILogin>(`${environment.serverPath}refresh`)
            .pipe(
                catchError(error => {
                    this.SnackbarService.openSnackbar(error.error.message);
                    return this.catchError.catchErrorHandler(error);
                }),
            )
            .subscribe(resp => {
                this.SnackbarService.openSnackbar('You are logged into your account');
                this.authorize();
                this.user.next(resp.user);
                localStorage.setItem('token', resp.accessToken);
            });
    }
    public uploadData(email: string, name: string, userInfo: IUserInfo) {
        this.http
            .post(
                `${environment.serverPath}uploadData`,
                { email, name, userInfo },
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }),
                },
            )
            .pipe(
                catchError(error => {
                    this.SnackbarService.openSnackbar(error.error.message);
                    return this.catchError.catchErrorHandler(error);
                }),
            )
            .subscribe(() => {
                this.SnackbarService.openSnackbar('Your information has been updated');
            });
    }
}
