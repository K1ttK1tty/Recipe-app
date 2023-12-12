import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import { IRecipe } from 'src/app/models/RecipeModel';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
    constructor(private apiService: ApiService) {
        this.apiService.allRecipes.subscribe(resp => {
            if (!resp) {
                this.unableToFetchRecipes$.next(true);
                return;
            }
            this.unableToFetchRecipes$.next(false);
            this.mockRecipes = resp;
            // this.newRecipes = resp;
        });
    }
    unableToFetchRecipes$ = new BehaviorSubject<boolean>(false);
    leftFilterPosition$ = new BehaviorSubject<boolean>(true);
    newRecipes?: IRecipe[] | [] = [];
    numberOfSkip = this.apiService.skipNumber;
    mockRecipes?: IRecipe[] | [];
    pageWidth: number = window.innerWidth;
    numberOfCols: string = this.colsNumber(window.innerWidth);
    public changeFilterPosition() {
        this.leftFilterPosition$.next(!this.leftFilterPosition$.value);
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.numberOfCols = this.colsNumber(window.innerWidth);
        this.pageWidth = window.innerWidth;
    }
    private colsNumber(size: number): string {
        if (size < 940) return '1';
        if (size > 1260) return '3';
        return '2';
    }
}
