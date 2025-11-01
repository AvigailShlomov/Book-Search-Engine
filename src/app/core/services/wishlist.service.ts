import { Injectable, signal } from '@angular/core';
import { BookVolumeInfo } from '../models/book.models';
import { WishlistActionResult } from '../../pages/wishlist/wishlist-result.enum';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  wishlist = signal<BookVolumeInfo[]>([]);

  addBookToWishlist(book: BookVolumeInfo) {
    if (this.isBookExistInWishlist(book.id)) {
      return WishlistActionResult.Exist;
    } else {
      this.wishlist.update((curr) => [...curr, book]);
      return WishlistActionResult.Added;
    }
  }

  private isBookExistInWishlist(bookId: string): boolean {
    return this.wishlist().some((b) => b.id === bookId);
  }

  removeBookFromWishlist(book: BookVolumeInfo) {
    this.wishlist.update((wishlist) => wishlist.filter((b) => b.id != book.id));   
  }
}
