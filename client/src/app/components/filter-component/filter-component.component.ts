import { Component, DoCheck } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

import { ICuisines, IDishType } from 'src/app/models/RecipeModel';

import { allCuisines, allDiets, allDishTypes, allIntolerances } from './data';

@Component({
    selector: 'app-filter-component',
    templateUrl: './filter-component.component.html',
    styleUrls: ['./filter-component.component.scss'],
})
export class FilterComponentComponent implements DoCheck {
    constructor(private filterService: FilterService) {}
    diets: string[] = allDiets;
    intolerances: string[] = allIntolerances;
    cuisines: ICuisines[] = allCuisines;
    dishTypes: IDishType[] = allDishTypes;
    ngDoCheck() {
        switch (this.filterService.panel) {
            case 'time':
                this.enableTime = true;
                this.maxTime = this.filterService.time;
                this.isPanelOpen = this.filterService.panel;
                if (this.isDisable) this.isDisable = false;
                this.filterService.panel = '';
                break;
            case 'ingridient':
                this.selectedIngridients.push(this.filterService.ingridient);
                this.isPanelOpen = this.filterService.panel;
                if (this.isDisable) this.isDisable = false;
                this.filterService.panel = '';
                break;
            case 'kcal':
                this.enableCalories = true;
                this.maxCalories = this.filterService.calories;
                this.minCalories = this.filterService.calories;
                setTimeout(() => {
                    this.minCalories =
                        Math.round(this.filterService.calories - 50) >= 0
                            ? Math.round(this.filterService.calories - 50)
                            : 0;
                    this.maxCalories = Math.round(this.filterService.calories + 50);
                }, 0);
                this.isPanelOpen = this.filterService.panel;
                if (this.isDisable) this.isDisable = false;
                this.filterService.panel = '';
                break;
            case 'diet':
                if (!this.selectedDiets.includes(this.filterService.diet)) {
                    this.selectedDiets.push(this.filterService.diet);
                }
                this.diet = this.filterService.diet;
                this.isPanelOpen = this.filterService.panel;
                if (this.isDisable) this.isDisable = false;
                this.filterService.panel = '';
                break;
            case 'intolerance':
                if (!this.selectedIntolerances.includes(this.filterService.intolerance)) {
                    this.selectedIntolerances.push(this.filterService.intolerance);
                }
                this.intolerance = this.filterService.intolerance;
                this.isPanelOpen = this.filterService.panel;
                if (this.isDisable) this.isDisable = false;
                this.filterService.panel = '';
                break;
            case 'dish':
                if (!this.selectedDishTypes.includes(this.filterService.dish)) {
                    this.selectedDishTypes.push(this.filterService.dish);
                }
                this.intolerance = this.filterService.intolerance;
                this.isPanelOpen = this.filterService.panel;
                if (this.isDisable) this.isDisable = false;
                this.filterService.panel = '';
                break;
            default:
                // console.log(this.includeStepByStepCooking)
                break;
        }
    }
    maxCalories = 800;
    minCalories = 0;
    minFat = 0;
    maxFat = 300;
    minProtein = 0;
    maxProtein = 300;
    minCarbohydrates = 0;
    maxCarbohydrates = 500;
    maxTime = 0;
    isPanelOpen = '';
    diet = '';
    intolerance = '';
    isDisable = true;
    includeStepByStepCooking = false;
    enableFats = false;
    enableCalories = false;
    enableProteins = false;
    enableCarbohydrates = false;
    enableTime = false;
    selectedDiets: string[] = [];
    selectedIntolerances: string[] = [];
    selectedDishTypes: string[] = [];
    selectedCuisines: string[] = [];
    selectedIngridients: string[] = [];
    public disable() {
        this.maxCalories = 800;
        this.minCalories = 0;
        this.minFat = 0;
        this.maxFat = 300;
        this.minProtein = 0;
        this.maxProtein = 300;
        this.minCarbohydrates = 0;
        this.maxCarbohydrates = 500;
        this.maxTime = 0;
        this.diet = '';
        this.intolerance = '';
        this.isDisable = true;
        this.includeStepByStepCooking = false;
        this.enableFats = false;
        this.enableCalories = false;
        this.enableProteins = false;
        this.enableCarbohydrates = false;
        this.enableTime = false;
        this.selectedDiets = [];
        this.selectedIntolerances = [];
        this.selectedDishTypes = [];
        this.selectedCuisines = [];
        this.selectedIngridients = [];
    }
    public enableReset() {
        this.isDisable = false;
    }
    public toggleAndDisableFalse(
        variable:
            | 'enableTime'
            | 'enableCarbohydrates'
            | 'enableProteins'
            | 'enableFats'
            | 'includeStepByStepCooking'
            | 'enableCalories',
    ) {
        this[variable] = !this[variable];
        this.isDisable = false;
    }
    public getDishTypeState(dishType: string) {
        return this.selectedDishTypes.includes(dishType);
    }
    public toggleSelectedDishTypes(dishType: string) {
        if (this.isDisable) this.isDisable = false;
        if (!this.selectedDishTypes.includes(dishType)) {
            this.selectedDishTypes.push(dishType);
            console.log(this.selectedDishTypes);
        } else {
            this.selectedDishTypes = this.selectedDishTypes.filter(currentDishType => currentDishType !== dishType);
            console.log(this.selectedDishTypes);
        }
    }
    public getDietState(diet: string) {
        return this.selectedDiets.includes(diet);
    }
    public toggleSelectedDiets(diet: string) {
        if (this.isDisable) this.isDisable = false;
        if (!this.selectedDiets.includes(diet)) {
            this.selectedDiets.push(diet);
            console.log(this.selectedDiets);
        } else {
            this.selectedDiets = this.selectedDiets.filter(currentDiet => currentDiet !== diet);
            console.log(this.selectedDiets);
        }
    }
    public getIntoleranceState(intolerance: string) {
        return this.selectedIntolerances.includes(intolerance);
    }
    public toggleSelectedIntolerances(intolerance: string) {
        if (this.isDisable) this.isDisable = false;
        if (!this.selectedIntolerances.includes(intolerance)) {
            this.selectedIntolerances.push(intolerance);
            console.log(this.selectedIntolerances);
        } else {
            this.selectedIntolerances = this.selectedIntolerances.filter(
                currentIntolerance => currentIntolerance !== intolerance,
            );
            console.log(this.selectedIntolerances);
        }
    }
    public getCuisineState(cuisine: string) {
        return this.selectedCuisines.includes(cuisine);
    }
    public toggleSelectedCuisines(cuisine: string) {
        if (this.isDisable) this.isDisable = false;
        if (!this.selectedCuisines.includes(cuisine)) {
            this.selectedCuisines.push(cuisine);
            console.log(this.selectedCuisines);
        } else {
            this.selectedCuisines = this.selectedCuisines.filter(currentCuisine => currentCuisine !== cuisine);
            console.log(this.selectedCuisines);
        }
    }
}
