import { Component, DoCheck } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FilterService } from 'src/app/services/filter.service';

import { ICuisines, IDishType } from 'src/app/models/RecipeModel';
import { IQueryParams } from 'src/app/models/RecipeModel';
import { IusersDietAndIntoleraces } from 'src/app/models/UserModel';

import { allCuisines, allDiets, allDishTypes, allIntolerances } from './data';

@Component({
    selector: 'app-filter-component',
    templateUrl: './filter-component.component.html',
    styleUrls: ['./filter-component.component.scss'],
})
export class FilterComponentComponent implements DoCheck {
    constructor(
        private filterService: FilterService,
        private apiService: ApiService,
        private authService: AuthService,
    ) {}

    diets: string[] = allDiets;
    intolerances: string[] = allIntolerances;
    cuisines: ICuisines[] = allCuisines;
    dishTypes: IDishType[] = allDishTypes;
    selectedDiets: string[] = [];
    selectedIntolerances: string[] = [];
    selectedDishTypes: string[] = [];
    selectedCuisines: string[] = [];
    selectedIngridients: string[] = [];
    usersDietsAndIntolerances!: IusersDietAndIntoleraces;
    yy: any;
    $subscription = this.authService.getUser().subscribe(observer => {
        this.selectedDiets = observer.data?.filterData.diets ? observer.data?.filterData.diets : [];
        this.selectedIntolerances = observer.data?.filterData.intolerances
            ? observer.data?.filterData.intolerances
            : [];
        this.usersDietsAndIntolerances = observer.data?.filterData;
        this.yy = observer;
        // console.log(this.selectedDiets);
        // console.log(observer.data?.filterData.diets);
    });

    ngDoCheck() {
        console.log(this.yy)
        switch (this.filterService.panel) {
            case 'time':
                this.enableTime = true;
                this.maxTime = this.filterService.time;
                this.shareLogic();
                break;
            case 'ingridient':
                this.selectedIngridients.push(this.filterService.ingridient);
                this.shareLogic();
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
                this.shareLogic();
                break;
            case 'diet':
                if (!this.selectedDiets.includes(this.filterService.diet)) {
                    this.selectedDiets.push(this.filterService.diet);
                }
                this.shareLogic();
                break;
            case 'intolerance':
                if (!this.selectedIntolerances.includes(this.filterService.intolerance)) {
                    this.selectedIntolerances.push(this.filterService.intolerance);
                }
                this.shareLogic();
                break;
            case 'dish':
                if (!this.selectedDishTypes.includes(this.filterService.dish)) {
                    this.selectedDishTypes.push(this.filterService.dish);
                }
                console.log(this.selectedDishTypes);
                console.log(this.selectedIntolerances);
                this.shareLogic();
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
    isDisable = true;
    includeStepByStepCooking = false;
    enableFats = false;
    enableCalories = false;
    enableProteins = false;
    enableCarbohydrates = false;
    enableTime = false;

    public send() {
        const result: IQueryParams = {
            cuisines: this.selectedCuisines.length > 0 ? `&cuisine=${[...this.selectedCuisines].join(',')}` : false,
            diets: this.selectedDiets.length > 0 ? `&diet=${[...this.selectedDiets].join('|')}` : false,
            dishTypes: this.selectedDishTypes.length > 0 ? `&type=${[...this.selectedDishTypes].join(',')}` : false,
            ingridients:
                this.selectedIngridients.length > 0
                    ? `&includeIngredients=${[...this.selectedIngridients].join(',')}`
                    : false,
            intolerances:
                this.selectedIntolerances.length > 0
                    ? `&intolerances=${[...this.selectedIntolerances].join(',')}`
                    : false,
            time: this.enableTime ? `&maxReadyTime=${this.maxTime}` : false,
            stepByStep: this.includeStepByStepCooking ? this.includeStepByStepCooking : false,
            fats: this.enableFats ? `&minFat=${this.minFat}&maxFat=${this.maxFat}` : false,
            proteins: this.enableProteins ? `&minProtein=${this.minProtein}&maxProtein=${this.maxProtein}` : false,
            calories: this.enableCalories ? `&minCalories=${this.minCalories}&maxCalories=${this.maxCalories}` : false,
            carbs: this.enableCarbohydrates
                ? `&minCarbs=${this.minCarbohydrates}&maxCarbs=${this.maxCarbohydrates}`
                : false,
        };
        let t = '';
        for (let key in result) {
            if (result[key]) t += result[key];
        }
        this.apiService.getRecipes(result);
    }
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
    private shareLogic() {
        this.isPanelOpen = this.filterService.panel;
        if (this.isDisable) this.isDisable = false;
        this.filterService.panel = '';
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
        // if (this.usersDietsAndIntolerances?.diets.includes(diet)) return true
        return this.selectedDiets.includes(diet);
    }
    public toggleSelectedDiets(diet: string) {
        if (this.usersDietsAndIntolerances?.diets.includes(diet)) {
            // console.log('eeeee')
            // console.log(this.usersDietsAndIntolerances);
            return;
        }
        if (this.isDisable) this.isDisable = false;
        if (!this.selectedDiets.includes(diet)) {
            // this.selectedDiets.push(diet);
            // console.log(this.selectedDiets);
        } else {
            this.selectedDiets = this.selectedDiets.filter(currentDiet => currentDiet !== diet);
            // console.log(this.selectedDiets);
        }
        console.log(this.usersDietsAndIntolerances);
    }
    public getIntoleranceState(intolerance: string) {
        return this.selectedIntolerances.includes(intolerance);
    }
    public toggleSelectedIntolerances(intolerance: string) {
        if (this.usersDietsAndIntolerances?.intolerances.includes(intolerance)) {
            return;
        }
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
