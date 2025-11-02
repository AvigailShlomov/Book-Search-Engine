import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../env';
import { BookApiRequest, BooksApiResponse } from '../models/book.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private BASE_URL = environment.googleBooksApi;
  private API_KEY = environment.googleBooksApiKey;

  fetchBooksFromApi(req: BookApiRequest): Observable<BooksApiResponse> {
    if (req.searchInput.length >= 1) {
      return this.http.get<BooksApiResponse>(
        `${this.BASE_URL}/volumes?q=${req.searchInput}&startIndex=${req.startIndex}&maxResults=${req.maxResult}&key=${this.API_KEY}`
      );
    } else return of({ totalItems: 0, kind: '' } as BooksApiResponse);
  }
}
