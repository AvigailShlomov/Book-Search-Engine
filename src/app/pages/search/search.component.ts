import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BooksService } from '../../core/services/books.service';
import { BookListComponent } from '../../components/book-list/book-list.component';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    BookListComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  private userService = inject(UserService);
  private booksService = inject(BooksService);
  username = this.userService.username;
  searchControl = new FormControl('', {
    validators: [Validators.required, Validators.maxLength(20)],
    nonNullable: true,
  });

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(startWith(this.searchControl.value))
      .subscribe((value) => {
        this.booksService.pageIndex.set(1);
        this.booksService.pageSize.set(10);

        this.booksService.inputValueSignal.set(value);
      });
  }
}
