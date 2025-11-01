import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookVolumeInfo } from '../../core/models/book.models';
import { WishlistService } from '../../core/services/wishlist.service';
import { BOOK_REMOVED } from './wishlist-result.enum';
import { UserService } from '../../core/services/user.service';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatPaginatorModule, BookCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  private usertService = inject(UserService);
  username = this.usertService.username;
  private wishlistService = inject(WishlistService);
  wishlist = this.wishlistService.wishlist;

 


}
