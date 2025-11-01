import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string, config: number) {
    this._snackBar.open(message, action, { duration: config });
  }
}
