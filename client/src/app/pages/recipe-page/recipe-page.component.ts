import { Component } from '@angular/core';

import { IRecipe } from 'src/app/models/RecipeModel';

@Component({
    selector: 'app-recipe-page',
    templateUrl: './recipe-page.component.html',
    styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent {
    recipe!: IRecipe;
    constructor() {}
    ngOnInit() {
        const navigationParams = window.history.state;
        this.recipe = navigationParams.recipe
    }
}
