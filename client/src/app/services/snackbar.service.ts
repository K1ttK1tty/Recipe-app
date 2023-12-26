import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private snackbar: MatSnackBar) {}
    public openSnackbar(message: string): void {
        this.snackbar.open(message, 'Close');
        setTimeout(() => {
            this.snackbar.dismiss();
        }, 4000);
    }
}
