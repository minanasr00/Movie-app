// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { WishlistService } from '../../services/wishlist.service';

// @Component({
//   selector: 'app-wishlist',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './wish-list.component.html',
//   styleUrls: ['./wish-list.component.css']
// })
// export class WishlistComponent implements OnInit {
//   movies: any[] = [];

//   constructor(private wishlistService: WishlistService) {}

//   ngOnInit() {
//   this.wishlistService.getMovies().subscribe(data => {
//     console.log(data);
//     this.movies = data;
//   });
// }

//   removeFromWishlist(index: number) {
//     this.movies.splice(index, 1);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie1 } from '../../interfaces/movie';
import { Observable, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishlistComponent implements OnInit {
  movies: Movie1[] = [];
  isEmpty: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    const wishlist = this.movieService.getWishlist();
    this.isEmpty = wishlist.length === 0;

    if (!this.isEmpty) {
      const movieObservables = wishlist.map(id => this.movieService.getMovieDetails(id));
      forkJoin(movieObservables).subscribe({
        next: (movies: Movie1[]) => {
          this.movies = movies;
          console.log(movies);

        },
        error: (error) => {
          console.error('Error loading wishlist:', error);
          this.isEmpty = true;
        }
      });
    }
  }

  removeFromWishlist(movieId: number): void {
    this.movieService.removeFromWishlist(movieId);
    this.movies = this.movies.filter(movie => movie.id !== movieId);
    this.isEmpty = this.movies.length === 0;
  }
}
