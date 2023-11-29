import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable({
    providedIn: 'root',
})
export class captchaService {
    constructor(private recaptchaV3Service: ReCaptchaV3Service) {}
    token = '';
    public getCaptchaToken() {
        this.recaptchaV3Service.execute('important').subscribe((currentToken: string) => {
            this.token = currentToken;
        });
        return this.token;
    }
}
