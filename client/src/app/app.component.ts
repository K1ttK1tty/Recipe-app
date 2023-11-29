import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChildrenOutletContexts } from '@angular/router';

import { slideInAnimation } from './animations/RouterAnimastions';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { captchaService } from './services/captcha.service';
import { LoadingService } from './services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private loginService: LoadingService,
        private contexts: ChildrenOutletContexts,
        private apiService: ApiService,
        private captchaService: captchaService,
    ) {}

    isLogin$ = this.loginService.getLogin();
    ngOnInit() {
        const captchaToken = this.captchaService.getCaptchaToken();

        this.authService.refresh();
        // this.apiService.getRecipes();
        this.apiService.getMockRecipes();
    }
    public getRouteAnimationData() {
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }
    public sendCaptcha(form: NgForm) {
        if (form.invalid) {
            for (const control of Object.keys(form.controls)) {
                form.controls[control].markAsTouched();
            }
            return;
        }
    }
}
