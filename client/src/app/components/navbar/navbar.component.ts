import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    windowScreen = window.innerWidth;
    currentPage = 'Recipes';
    isAuthorized = false;

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
