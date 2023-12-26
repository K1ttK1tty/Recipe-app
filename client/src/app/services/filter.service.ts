import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    time = 0;
    calories = 0;
    panel = '';
    intolerance = '';
    diet = '';
    dish = '';
    ingridient = '';
}
