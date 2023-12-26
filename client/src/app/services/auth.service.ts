import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, Subscription, catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

import { ILogin, IUser, IUserInfo } from '../models/UserModel';

import { CatchErrorService } from './catch-error.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private SnackbarService: SnackbarService,
        private router: Router,
        private catchError: CatchErrorService,
        private recaptchaV3Service: ReCaptchaV3Service,
    ) {}
    private isUserAuthorized = new BehaviorSubject(false);
    private user = new BehaviorSubject<IUser | {}>({});
    public getUser(): Observable<IUser> {
        return this.user.asObservable() as BehaviorSubject<IUser>;
    }
    public updateUser(data: IUser): void {
        this.user.next(data);
    }
    public getAuthState(): Observable<boolean> {
        return this.isUserAuthorized.asObservable();
    }
    public authorize(): void {
        this.isUserAuthorized.next(true);
    }
    public unAuthorize(): void {
        this.isUserAuthorized.next(false);
    }
    public registration(name: string, email: string, password: string): void {
        this.recaptchaV3Service.execute('important').subscribe((captchaToken: string) => {
            return this.http
                .post(`${environment.serverPath}registration`, {
                    userName: name,
                    email,
                    password,
                    captchaToken,
                })
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        this.SnackbarService.openSnackbar(error.error.message);
                        return this.catchError.catchErrorHandler(error);
                    }),
                )
                .subscribe(() => {
                    this.SnackbarService.openSnackbar('Registration completed successfully');
                });
        });
    }
    public login(email: string, password: string): void {
        this.recaptchaV3Service.execute('important').subscribe((captchaToken: string) => {
            return this.http
                .post<ILogin>(`${environment.serverPath}login`, {
                    email,
                    password,
                    captchaToken,
                })
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
        });
    }
    public logOut(): void {
        this.recaptchaV3Service.execute('important').subscribe((captchaToken: string) => {
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
        });
    }
    public refresh(): void {
        this.http
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
    public uploadData(email: string, name: string, userInfo: IUserInfo): void {
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
