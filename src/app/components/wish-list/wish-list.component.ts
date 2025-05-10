import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishlistComponent implements OnInit {
  movies: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
  this.wishlistService.getMovies().subscribe(data => {
    console.log(data);
    this.movies = data;
  });
}

  removeFromWishlist(index: number) {
    this.movies.splice(index, 1);
  }
}
