import { Component, inject, input } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BooksService } from '../../core/services/books.service';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  public booksService = inject(BooksService);
  total = input.required<number>();

  pageSizeOptions = [5, 10, 20];

  onChangePage(event: PageEvent) {
    this.booksService.pageSize.set(event.pageSize);
    this.booksService.pageIndex.set(event.pageIndex + 1);
  }
}
