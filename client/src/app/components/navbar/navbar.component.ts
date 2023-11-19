import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor(private AuthService: AuthService) {}
    windowScreen = window.innerWidth;
    subscription$ = this.AuthService.getAuthState.subscribe(resp => {
        this.isAuthorized = resp;
    });
    isAuthorized = false;
    currentPage = 'Recipes';
    public setPath(page: string) {
        this.currentPage = page;
    }
    mobileOrDescMenu: boolean = this.menuVariant(window.innerWidth);
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.mobileOrDescMenu = this.menuVariant(window.innerWidth);
    }
    private menuVariant(size: number): boolean {
        if (size >= 768) return true;
        return false;
    }
}
