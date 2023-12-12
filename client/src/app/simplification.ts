import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MaterialShipsComponent } from './components/material-ships/material-ships.component';

import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { BotComponent } from './pages/bot/bot.component';
import { MyFavoritesComponent } from './pages/my-favorites/my-favorites.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

export const materialImports = [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MaterialShipsComponent,
    MatSnackBarModule,
];
export const routes = [
    { path: '', component: RecipesComponent },
    { path: 'recipe/:recipeId', component: RecipePageComponent, data: { animation: 'HomePage' } },
    { path: 'bot', component: BotComponent, data: { animation: 'HomePage' } },
    { path: 'profile', component: ProfileComponent, data: { animation: 'AboutPage' } },
    { path: 'favorites', component: MyFavoritesComponent, data: { animation: '2' } },
    { path: 'authorization', component: AuthorizationComponent, data: { animation: '3' } },
    { path: '**', component: NotFoundPageComponent },
];
