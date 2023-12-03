import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class captchaService {
    constructor(private recaptchaV3Service: ReCaptchaV3Service) {}
    token: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public getCaptchaToken():string {
        this.recaptchaV3Service.execute('important').subscribe((currentToken: string) => {
            this.token.next(currentToken);
        });
        return this.token.value
    }
}
