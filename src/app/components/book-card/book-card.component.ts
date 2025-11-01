import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { BookVolumeInfo } from '../../core/models/book.models';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../../dialogs/book-dialog/book-dialog.component';
import { Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { BOOK_REMOVED } from '../../pages/wishlist/wishlist-result.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatIcon],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent implements OnInit {
  private dialog = inject(MatDialog);
  private route = inject(Router);
  private wishlistService = inject(WishlistService);
  private readonly _snackBar = inject(MatSnackBar);
  defaultThumbnail = 'default-book.png';

  isWishlist = signal<boolean>(false);

  book = input.required<BookVolumeInfo>();
  id = input.required<string>();
  bookInfo = signal<BookVolumeInfo | null>(null);

  ngOnInit() {
    this.isWishlist.set(this.route.url.includes('wishlist'));
  }

  openDialog() {
    this.dialog.open(BookDialogComponent, {
      data: {
        book: { ...this.book(), id: this.id },
      },
    });
  }

  removeBook() {
    this.wishlistService.removeBookFromWishlist(this.book());
    this._snackBar.open(BOOK_REMOVED, '', { duration: 3000 });
  }
}
