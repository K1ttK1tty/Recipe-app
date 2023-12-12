import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe, NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

import { IIngridietnsList } from 'src/app/models/RecipeModel';

let onInitialization = 0;
@Component({
    selector: 'app-material-ships',
    templateUrl: './material-ships.component.html',
    styleUrls: ['./material-ships.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.Emulated,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatChipsModule,
        NgFor,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
        NgIf,
    ],
})
export class MaterialShipsComponent implements OnInit, OnDestroy {
    constructor(private api: ApiService) {
        this.filteredFruits$ = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: IIngridietnsList | null) => (fruit ? this._filter(fruit) : this.allFruits)),
        );
    }
    @Input() selectedIngridients: string[] = [];
    @Output() ingridient: EventEmitter<any> = new EventEmitter();
    @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

    subscribtion?: Subscription;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl: FormControl<IIngridietnsList | null> = new FormControl({ ingridient: '', id: 0 });
    filteredFruits$: Observable<IIngridietnsList[]>;
    allFruits!: IIngridietnsList[];
    announcer = inject(LiveAnnouncer);
    ngOnInit() {
        if (onInitialization) return;
        onInitialization = 1;
        this.subscribtion = this.api
            .getlistOfIngridients()
            .subscribe((response: IIngridietnsList[]) => (this.allFruits = response));
    }
    ngOnDestroy(): void {
        if (this.subscribtion) {
            this.subscribtion.unsubscribe();
        }
    }
    public add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.allFruits.forEach(({ ingridient }) => {
                if (ingridient === value) this.selectedIngridients.push(value);
            });
        }
        event.chipInput!.clear();
        this.fruitCtrl.setValue(null);
    }

    public remove(fruit: string): void {
        const index = this.selectedIngridients.indexOf(fruit);
        if (index >= 0) {
            this.selectedIngridients.splice(index, 1);
            this.announcer.announce(`Removed ${fruit}`);
        }
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        this.ingridient.emit();
        console.log(123);
        this.selectedIngridients.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    private _filter(value: IIngridietnsList): IIngridietnsList[] {
        const stringLine: unknown = value as unknown;
        const yy = stringLine as string;
        const filterValue = yy.toLowerCase();
        return this.allFruits.filter(fruit => fruit.ingridient.toLowerCase().includes(filterValue));
    }
}
