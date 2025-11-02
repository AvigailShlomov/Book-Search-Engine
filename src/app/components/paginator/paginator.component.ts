import {
  Component,
  inject,
  input,
  model,
} from '@angular/core';
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
  pageSize = model.required<number>();
  pageIndex = model.required<number>();

  pageSizeOptions = [5, 10];

  onChangePage(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex + 1);
  }
}
