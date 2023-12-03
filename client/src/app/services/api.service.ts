import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

import { IQueryParams } from '../models/RecipeModel';
import { IIngridietnsList } from '../models/RecipeModel';
import { IRecipe } from '../models/RecipeModel';
import { IFetch } from '../models/ServiceModels';
import { CatchErrorService } from './catch-error.service';
import { environment } from 'src/enviroment/enviroment';
@Injectable({
    providedIn: 'root',
})
export class ApiService {
    skipNumber = 0;
    vhn = new BehaviorSubject(undefined);
    allRecipes: BehaviorSubject<IRecipe[] | undefined> = new BehaviorSubject<IRecipe[] | undefined>(undefined);
    constructor(private http: HttpClient,private catchError:CatchErrorService) {}

    public getRecipes(params?: IQueryParams): Observable<HttpResponse<IFetch>> {
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
        return recipes;
    }
    public getMockRecipes(): Observable<IFetch> {
        const response = this.http.get<IFetch>('../../assets/DADATA.json');
        response.subscribe(resp => {
            this.allRecipes?.next(resp.results);
        });
        return response;
    }
    public getlistOfIngridients() {
        return this.http.get<IIngridietnsList[]>('../../assets/listOfIngredients.json');
    }
}
