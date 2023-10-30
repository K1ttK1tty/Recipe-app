import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { IRecipe } from 'src/app/models/RecipeModel';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    constructor(private service: ApiService) {}
    newRecipes: IRecipe[] | [] = [];
    numberOfSkip = this.service.skipNumber;
    mockRecipes: IRecipe[] | [] = [];
    ngOnInit() {
        // this.getRecipes()
        this.getMockResipes();
    }
    public getRecipes() {
        this.service.getRecipes().subscribe(resp => {
            if (resp.body?.results) {
                this.newRecipes = [...this.newRecipes, ...resp.body?.results];
            }
        });
        this.numberOfSkip = this.service.skipNumber;
    }
    public getMockResipes() {
        this.service.getMockRecipes().subscribe(resp => {
            if (resp?.results) {
                this.mockRecipes = resp.results;
                console.log(resp.results);
            }
        });
    }
    pageWidth: number = window.innerWidth;
    numberOfCols: string = this.colsNumber(window.innerWidth);
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
