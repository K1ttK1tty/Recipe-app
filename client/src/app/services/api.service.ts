import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { IQueryParams } from '../models/RecipeModel';
import { IIngridietnsList } from '../models/RecipeModel';
import { IRecipe } from '../models/RecipeModel';

export interface IFetch {
    results?: IRecipe[] | undefined;
    offset?: number | undefined;
    number?: number | undefined;
    totalResults?: number | undefined;
}
@Injectable({
    providedIn: 'root',
})
export class ApiService {
    skipNumber = 0;
    allRecipes!: IRecipe[] | [];
    constructor(private http: HttpClient) {}

    public getRecipes(params?: IQueryParams): Observable<HttpResponse<IFetch>> {
        const currentParams = new HttpParams({ fromObject: params });
        // console.log(currentParams);
        const recipes = this.http
            .get<IFetch>(`http://localhost:5001/api/getRecipes/${this.skipNumber}`, {
                observe: 'response',
                params: currentParams,
            })
            .pipe(catchError(this.catchErrorHandler));
        // this.skipNumber += 21;
        console.log(recipes.subscribe(resp=>{
            console.log(resp.body)
        }))
        return recipes;
    }
    public getMockRecipes(): Observable<IFetch> {
        return this.http.get<IFetch>('../../assets/DADATA.json');
    }
    private catchErrorHandler(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occured:', error.error);
        } else {
            console.error(`Backend returned error code - ${error.status}`);
        }
        return throwError(() => new Error('Something went wrong. Please try again later.'));
    }
    public getlistOfIngridients() {
        return this.http.get<IIngridietnsList[]>('../../assets/listOfIngredients.json');
    }
}
