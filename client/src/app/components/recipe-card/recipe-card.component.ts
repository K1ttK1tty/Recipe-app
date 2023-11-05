import { Component, Input } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

import { IRecipe } from 'src/app/models/RecipeModel';

@Component({
    selector: 'app-recipe-card',
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
    constructor(private filterService: FilterService) {}
    @Input() recipe!: IRecipe;
    public getTime() {
        this.filterService.time = this.recipe.readyInMinutes;
        this.filterService.panel = 'time';
    }
    public getCalories() {
        this.filterService.calories = this.recipe.nutrition.nutrients[0].amount;
        this.filterService.panel = 'kcal';
    }
    public getDishType(dish: string) {
        this.filterService.dish = dish;
        this.filterService.panel = 'dish';
    }
    public getIngridient(ingridient: string) {
        this.filterService.ingridient = ingridient;
        this.filterService.panel = 'ingridient';
    }

    private number = 0;
    public setNumber(x: number) {
        this.number = x;
    }
    public getNumber() {
        return this.number;
    }
}
