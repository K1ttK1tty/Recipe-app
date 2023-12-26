import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

import { IQueryParams } from '../models/RecipeModel';
import { IIngridietnsList } from '../models/RecipeModel';
import { IRecipe } from '../models/RecipeModel';
import { IFetch } from '../models/ServiceModels';

import { CatchErrorService } from './catch-error.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    skipNumber = 0;
    private allRecipes: BehaviorSubject<IRecipe[] | undefined> = new BehaviorSubject<IRecipe[] | undefined>(undefined);
    constructor(
        private http: HttpClient,
        private catchError: CatchErrorService,
    ) {}
    public getAllRecipes(): Observable<IRecipe[] | undefined> {
        return this.allRecipes.asObservable();
    }
    public getRecipes(params?: IQueryParams): void {
        const currentParams = new HttpParams({ fromObject: params });
        // console.log(currentParams);
        const recipes = this.http
            .get<IFetch>(`${environment.serverPath}getRecipes/${this.skipNumber}`, {
                observe: 'response',
                params: currentParams,
            })
            .pipe(catchError(this.catchError.catchErrorHandler));
        // this.skipNumber += 21;
        recipes.subscribe(resp => {
            console.log(resp.body);
        });
    }
    public getMockRecipes(): void {
        // don't needs to be covered by tests
        this.http
            .get<IFetch>('../../assets/DADATA.json')
            .pipe(catchError(this.catchError.catchErrorHandler))
            .subscribe(resp => {
                this.allRecipes?.next(resp.results);
                console.log(resp.results);
            });
    }
    public getlistOfIngridients(): Observable<IIngridietnsList[]> {
        return this.http
            .get<IIngridietnsList[]>('../../assets/listOfIngredients.json')
            .pipe(catchError(this.catchError.catchErrorHandler));
    }
}
