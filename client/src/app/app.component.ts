import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

import { slideInAnimation } from './animations/RouterAnimastions';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private contexts: ChildrenOutletContexts,
    ) {}
    ngOnInit() {
        this.authService.refresh();
    }
    getRouteAnimationData() {
        console.log(this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'])
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }
}
