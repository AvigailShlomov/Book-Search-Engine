import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../core/services/user.service';
import { FORM_INVALID } from '../wishlist/wishlist-result.enum';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private commonService = inject(CommonService);

  readonly form = this.fb.group({
    username: ['', Validators.required],
  });

  onSubmit(): void {
    const username = this.form.value.username;

    if (this.form.valid && username) {
      this.userService.username.set(username);
      this.router.navigate(['/search']);
    } else {
      this.commonService.openSnackBar(FORM_INVALID, '', 3000);

      return;
    }
  }
}
