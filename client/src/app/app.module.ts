import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterComponentComponent } from './components/filter-component/filter-component.component';
import { IconsComponent } from './components/icons/icons.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { BotComponent } from './pages/bot/bot.component';
import { MyFavoritesComponent } from './pages/my-favorites/my-favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MyFavoritesComponent,
        ProfileComponent,
        BotComponent,
        RecipesComponent,
        RecipePageComponent,
        AuthorizationComponent,
        RecipeCardComponent,
        IconsComponent,
        FilterComponentComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatExpansionModule,
        MatMenuModule,
        MatCardModule,
        MatGridListModule,
        MatBadgeModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatTooltipModule,   
        RouterModule.forRoot([
            { path: '', component: RecipesComponent },
            { path: 'recipe/:recipeId', component: RecipePageComponent },
            { path: 'bot', component: BotComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'favorites', component: MyFavoritesComponent },
            { path: 'authorization', component: AuthorizationComponent },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
