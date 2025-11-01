import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string, config: number) {
    this.snackBar.open(message, action, { duration: config });
  }
}
