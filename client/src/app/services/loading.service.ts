import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    constructor() {}
    private isLoading = new BehaviorSubject(false);
    public getLogin() {
        return this.isLoading;
    }
    public showLoading() {
        setTimeout(() => {
            this.isLoading.next(true);
        }, 500);
    }
    public hideLoading() {
        setTimeout(() => {
            this.isLoading.next(false);
        }, 500);
    }
}
