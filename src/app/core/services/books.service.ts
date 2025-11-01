import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../env';
import { BookApiRequest, BooksApiResponse } from '../models/book.models';
import {
  catchError,
  combineLatest,
  debounceTime,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private BASE_URL = environment.googleBooksApi;
  private API_KEY = environment.googleBooksApiKey;

  pageIndex = signal<number>(1);
  pageSize = signal<number>(10);
  inputValueSignal = signal<string>('');

  // to observables for debounce
  inputValue$ = toObservable(this.inputValueSignal);
  pageIndex$ = toObservable(this.pageIndex);
  pageSize$ = toObservable(this.pageSize);

  finalSearchValue$ = combineLatest([
    this.inputValue$.pipe(debounceTime(300)),
    this.pageIndex$,
    this.pageSize$,
  ]).pipe(
    startWith<[string, number, number]>([
      this.inputValueSignal(),
      this.pageIndex(),
      this.pageSize(),
    ])
  );

  // updates when ever a new input is typed OR when pageSize, pageIndex has changed:)
  private searchResults$: Observable<BooksApiResponse> =
    this.finalSearchValue$.pipe(
      switchMap(([query, pageIndex, pageSize]) => {
        const apiRequest: BookApiRequest = {
          searchInput: query,
          startIndex: (pageIndex - 1) * pageSize,
          maxResult: pageSize,
        };

        return this.featchBooksFromApi(apiRequest).pipe(
          catchError(() => of({ totalItems: 0, kind: '' } as BooksApiResponse))
        );
      })
    );

  //signal for search result
  searchResultsSignal = toSignal(this.searchResults$);

  //takes only the items for the UI
  books = computed(() => {
    this.searchResultsSignal();
    return this.searchResultsSignal()?.items;
  });

  featchBooksFromApi(req: BookApiRequest): Observable<BooksApiResponse> {
    if (req.searchInput.length >= 1) {
      return this.http.get<BooksApiResponse>(
        `${this.BASE_URL}/volumes?q=${req.searchInput}&startIndex=${req.startIndex}&maxResults=${req.maxResult}&key=${this.API_KEY}`
      );
    } else return of({ totalItems: 0, kind: '' } as BooksApiResponse);
  }
}
