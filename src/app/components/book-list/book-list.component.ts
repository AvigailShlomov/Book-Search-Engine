import {
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { BooksService } from '../../core/services/books.service';
import { MatPaginator } from '@angular/material/paginator';
import { PaginatorComponent } from '../paginator/paginator.component';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  imports: [PaginatorComponent, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  public booksService = inject(BooksService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  books = this.booksService.books;
  isShowPaginator = signal(false);
  readonly totalBooks = computed(
    () => this.booksService.searchResultsSignal()?.totalItems ?? 0
  );

  constructor() {
    effect(() => {
      this.isShowPaginator.set(this.totalBooks() > 0);
    });
  }
}
