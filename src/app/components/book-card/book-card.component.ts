import {
  Component,
  computed,
  inject,
  input,
  Signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { BookVolumeInfo } from '../../core/models/book.models';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../../dialogs/book-dialog/book-dialog.component';
import { Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { BOOK_REMOVED } from '../../pages/wishlist/wishlist-result.enum';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatIcon],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private wishlistService = inject(WishlistService);
  private commonService = inject(CommonService);
  defaultThumbnail = 'default-book.png';

  isWishlist: Signal<boolean> = computed(() => {
    return this.router.url.includes('wishlist');
  });

  book = input.required<BookVolumeInfo>();
  id = input.required<string>();

  openDialog() {
    this.dialog.open(BookDialogComponent, {
      data: {
        book: { ...this.book(), id: this.id },
      },
    });
  }

  removeBook() {
    this.wishlistService.removeBookFromWishlist(this.book());
    this.commonService.openSnackBar(BOOK_REMOVED, '', 3000);
  }
}
