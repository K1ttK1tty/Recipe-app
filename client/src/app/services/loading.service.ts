import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private isLoading = new BehaviorSubject(false);
    public getLogin(): Observable<boolean> {
        return this.isLoading.asObservable();
    }
    public showLoading(): void {
        setTimeout(() => {
            this.isLoading.next(true);
        }, 500);
    }
    public hideLoading(): void {
        setTimeout(() => {
            this.isLoading.next(false);
        }, 500);
    }
}
