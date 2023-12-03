import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CatchErrorService {
    constructor() {}
    public catchErrorHandler(error: HttpErrorResponse) {
        let message = error.error.message ? (error.error.message as string) : '';
        if (!message) {
            if (error.status === 0) message = 'An error occured';
            else message = `Backend Error - ${error.status}`;
        }
        return throwError(() => {
            return new Error('Something went wrong. Please try again later.');
        });
    }
}
