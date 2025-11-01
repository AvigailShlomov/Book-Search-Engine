import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BookVolumeInfo } from '../../core/models/book.models';
import { WishlistService } from '../../core/services/wishlist.service';
import { CommonService } from '../../core/services/common.service';
import {
  BOOK_ADDED,
  BOOK_EXIST,
  WishlistActionResult,
} from '../../pages/wishlist/wishlist-result.enum';

@Component({
  selector: 'app-book-dialog',
  imports: [MatDialogContent, MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDialogComponent implements OnInit {
  private route = inject(Router);
  private wishlistService = inject(WishlistService);
  private commonService = inject(CommonService);

  private readonly dialogRef = inject(MatDialogRef<BookDialogComponent>);
  data: { book: BookVolumeInfo } = inject(MAT_DIALOG_DATA);
  bookData!: BookVolumeInfo;
  showFull = signal(false);
  isWishlist = signal<boolean>(false);

  readonly isShowMore = computed(
    () =>
      !!this.data.book.description && this.data.book.description.length > 200
  );

  readonly descriptionToShow = computed(() => {
    const description = this.data.book.description ?? '';
    if (!this.showFull() && description.length > 200) {
      return description.slice(0, 200);
    }
    return description;
  });

  ngOnInit() {
    this.bookData = this.data.book;
    this.isWishlist.set(this.route.url.includes('wishlist'));
  }

  toggleDescription() {
    this.showFull.update((v) => !v);
  }

  addBookToWishlist() {
    const actionResult = this.wishlistService.addBookToWishlist(this.data.book);
    const message =
      actionResult === WishlistActionResult.Added ? BOOK_ADDED : BOOK_EXIST;

    this.commonService.openSnackBar(message, '', 3000);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
