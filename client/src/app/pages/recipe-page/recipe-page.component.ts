import { Component } from '@angular/core';

import { INutruent, IProperties, IRecipe, ISteps } from 'src/app/models/RecipeModel';

@Component({
    selector: 'app-recipe-page',
    templateUrl: './recipe-page.component.html',
    styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent {
    recipe!: IRecipe;
    cookingSteps!: ISteps[];
    properties!: IProperties[];
    nutriets: INutruent[] = [];
    constructor() {}
    ngOnInit() {
        const navigationParams = window.history.state;
        this.recipe = navigationParams.recipe;
        this.cookingSteps = [...this.recipe.analyzedInstructions[0].steps];
        this.properties = [...this.recipe.nutrition.properties];

        console.log(this.recipe);
        const iteratedNutrients = [...this.recipe.nutrition.nutrients];
        this.nutriets = iteratedNutrients.filter(this.remainNutrients);
    }
    public goBack(): void {
        window.history.back();
    }

    private remainNutrients(nutrient: INutruent): boolean {
        const nutrientsNames = [
            'Calories',
            'Carbohydrates',
            'Net Carbohydrates',
            'Fat',
            'Protein',
            'Sugar',
            'Iron',
            'Zinc',
            'Vitamin C',
            'Calcium',
        ];
        return nutrientsNames.includes(nutrient.name);
    }
}
