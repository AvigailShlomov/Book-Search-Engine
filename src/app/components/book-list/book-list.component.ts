import {
  Component,
  computed,
  inject,
  input,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { BooksService } from '../../core/services/books.service';
import { MatPaginator } from '@angular/material/paginator';
import { PaginatorComponent } from '../paginator/paginator.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  debounceTime,
  startWith,
  Observable,
  switchMap,
  catchError,
  of,
} from 'rxjs';
import {
  BooksApiResponse,
  BookApiRequest,
} from '../../core/models/book.models';

@Component({
  selector: 'app-book-list',
  imports: [PaginatorComponent, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  public booksService = inject(BooksService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly totalBooks = computed(
    () => this.searchResultsSignal()?.totalItems ?? 0
  );

  userInput = input<Signal<string>>();
  userInputSignal = computed(() => {
    const initVal = this.userInput();
    return initVal ? initVal() : '';
  });

  pageIndex = signal<number>(1);
  pageSize = signal<number>(10);

  // to observables for debounce
  inputValue$ = toObservable(this.userInputSignal);
  pageIndex$ = toObservable(this.pageIndex);
  pageSize$ = toObservable(this.pageSize);

  // updates what to search when ever a new input is typed
  // OR when pageSize, pageIndex were changed:)
  finalSearchValue$ = combineLatest<[string, number, number]>([
    this.inputValue$.pipe(debounceTime(300)),
    this.pageIndex$,
    this.pageSize$,
  ]).pipe(
    startWith<[string, number, number]>([
      this.userInputSignal(),
      this.pageIndex(),
      this.pageSize(),
    ])
  );

  private searchResults$: Observable<BooksApiResponse> =
    this.finalSearchValue$.pipe(
      switchMap(([query, pageIndex, pageSize]) => {
        const apiRequest: BookApiRequest = {
          searchInput: query,
          startIndex: (pageIndex - 1) * pageSize,
          maxResult: pageSize,
        };
        return this.booksService.fetchBooksFromApi(apiRequest);
      })
    );

  //signal for search result
  searchResultsSignal = toSignal(this.searchResults$);

  //takes only the items for the UI
  books = computed(() => {
    this.searchResultsSignal();
    return this.searchResultsSignal()?.items;
  });

  noResult = computed(() => {
    const searchResult = this.searchResultsSignal();
    return (
      searchResult?.totalItems == 0 && searchResult?.kind == 'books#volumes'
    );
  });
}
