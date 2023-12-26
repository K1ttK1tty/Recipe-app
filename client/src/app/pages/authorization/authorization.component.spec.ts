import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthorizationComponent } from './authorization.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReCaptchaV3Service, RecaptchaLoaderService, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/enviroment/enviroment';

describe('AuthorizationComponent', () => {
    let component: AuthorizationComponent;
    let fixture: ComponentFixture<AuthorizationComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthorizationComponent, BrowserAnimationsModule, HttpClientModule],
            providers: [
                HttpClient,
                AuthService, 
                SnackbarService,
                ReCaptchaV3Service,
                RecaptchaLoaderService,
                { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaKey },
                MatSnackBar,
            ],
        });
        fixture = TestBed.createComponent(AuthorizationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
