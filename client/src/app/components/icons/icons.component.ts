import { Component, Input } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
    selector: 'app-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
})
export class IconsComponent {
    @Input() veryPopular!: boolean;
    @Input() veryHealthy!: boolean;
    @Input() cheap!: boolean;
    @Input() dairyFree!: boolean;
    @Input() vegetarian!: boolean;
    @Input() vegan!: boolean;
    @Input() glutenFree!: boolean;
    @Input() lowFodmap!: boolean;
    @Input() sustainable!: boolean;
    @Input() time!: number;
    @Input() enableFilter?: boolean;
    isFilled = true;
    isLike = true;
    constructor(private filterService: FilterService) {}

    public getDiet(diet: string): void {
        if (!this.enableFilter) return;
        this.filterService.panel = 'diet';
        this.filterService.diet = diet;
    }
    public getIntolerance(intolerance: string): void {
        if (!this.enableFilter) return;
        this.filterService.panel = 'intolerance';
        this.filterService.intolerance = intolerance;
    }
}
