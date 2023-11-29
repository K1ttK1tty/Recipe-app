import { HttpClientModule } from '@angular/common/http';
import { NgModule, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { recaptcha } from 'src/enviroment/enviroment';

import { FilterComponentComponent } from './components/filter-component/filter-component.component';
import { IconsComponent } from './components/icons/icons.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { BotComponent } from './pages/bot/bot.component';
import { MyFavoritesComponent } from './pages/my-favorites/my-favorites.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { AllInterceptors } from './services/apiInterceptors/AllInterceptors';
import { materialImports } from './simplification';
import { routes } from './simplification';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MyFavoritesComponent,
        ProfileComponent,
        BotComponent,
        RecipesComponent,
        RecipePageComponent,
        RecipeCardComponent,
        IconsComponent,
        FilterComponentComponent,
        NotFoundPageComponent,
    ],
    imports: [
        RouterOutlet,
        RouterLink,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        [...materialImports],
        FormsModule,
        AuthorizationComponent,
        RouterModule.forRoot(routes),
        RecaptchaV3Module,
    ],
    providers: [
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: recaptcha.siteKey || 'recaptchaKeyRequired' },
        importProvidersFrom(HttpClientModule),
        AllInterceptors,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
