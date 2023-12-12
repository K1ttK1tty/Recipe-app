import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/enviroment/enviroment';

import { slideInAnimation } from './animations/RouterAnimastions';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { PushNotificationsService } from './services/push-notifications.service';

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
        private swPush: SwPush,
        private pushNotifService: PushNotificationsService,
    ) {}

    isLogin$ = this.loginService.getLogin();
    ngOnInit() {
        this.authService.refresh();
        // this.apiService.getRecipes();
        this.apiService.getMockRecipes();
        this.subscribeNotifications();
    }
    public subscribeNotifications() {
        this.swPush
            .requestSubscription({
                serverPublicKey: environment.vapidPublicKey,
            })
            .then(sub => {
                this.pushNotifService.assingSubscription(sub);
            })
            .catch(err => console.log(err));
    }
    public getRouteAnimationData() {
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }
}
