import { Component, HostListener } from '@angular/core';
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
            this.mockRecipes = resp;
            // this.newRecipes = resp;
        });
    }
    newRecipes?: IRecipe[] | [] = [];
    numberOfSkip = this.apiService.skipNumber;
    mockRecipes?: IRecipe[] | [];
    pageWidth: number = window.innerWidth;
    numberOfCols: string = this.colsNumber(window.innerWidth);
    public getRecipes() {
        this.apiService.getRecipes().subscribe(resp => {
            if (resp.body?.results) {
                // const array = [...(this.newRecipes || [])];
                // this.newRecipes = [...(this.newRecipes || []), ...resp.body?.results];
            }
        });
        this.numberOfSkip = this.apiService.skipNumber;
    }
    public getMockResipes() {
        // this.apiService.getMockRecipes().subscribe(resp => {
        //     if (resp?.results) {
        //         this.mockRecipes = resp.results;
        //         console.log(resp.results);
        //     }
        // });
        // this.mockRecipes = this.apiService.allRecipes;
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
