import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

import { IRecipe } from 'src/app/models/RecipeModel';

@Component({
    selector: 'app-recipe-card',
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
    constructor(
        private filterService: FilterService,
        private router: Router,
    ) {}
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
    public navigate() {
        //  this.router.navigateByUrl('/123', { state: { hello: 'world' } });
        this.router.navigateByUrl('/recipe/' + this.recipe.id, { state: { recipe: this.recipe } });
    }
}
// Developer-defined state that can be passed to any navigation.
//  Access this value through the Navigation.extras object returned from the Router.getCurrentNavigation() method while a navigation is executing.
