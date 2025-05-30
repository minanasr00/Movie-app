import { CommonModule } from '@angular/common';
import { Component, DoCheck, effect, Input, OnInit } from '@angular/core';
import { HomeDataService } from './../../services/home-data.service';
import { Observable, tap } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedataService } from '../../services/sharedata.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';


export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  movies$!: Observable<Movie[]>;
  pageNumber: number = 1;
  count !: number;
  language !: string
  searchQuery: string = '';



  constructor(private HomeDataService: HomeDataService,private router: Router ,private sharedata: SharedataService ,private movieService: MovieService, private authService: AuthService, private AuthService: AuthService) {
    this.movies$ = this.HomeDataService.getMovies().pipe(
      tap((movies$: Movie[]) => {
        console.log(movies$);
        this.count = movies$.length;
      })
    );
    effect(() => {
      this.language = this.sharedata.data();
      console.log('Stored data in Sibling2:', this.language);
      this.movies$ = this.HomeDataService.getMovies(
        this.language,
        this.pageNumber
      );
    });


  }

  changePage(page: number, count: number, li: HTMLLIElement) {
    console.log(this.language);

    li.classList.add('page-item.active');
    if (page < 1) {
      page = 1;
    } else if (page > count) {
      page = count;
    }
    this.pageNumber = page;
    if (page < 1) {
      this.movies$ = this.HomeDataService.getMovies(this.language, 1);
    } else if (page > count + 1) {
      this.movies$ = this.HomeDataService.getMovies(this.language, count);
    } else {
      this.movies$ = this.HomeDataService.getMovies(this.language, page);
    }
  }


  getMovieDetails(id: number) {
    console.log(id);
    this.router.navigate(['/movie', id]);
  }

  onSearch(): void{
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

toggleWishlist(movieId: number): void {
  if (!this.authService.isLoggedIn()) {
    localStorage.setItem('redirectAfterLogin', '/home');  // Redirect after heart click
    this.router.navigate(['/login']);
    return;
  }

  if (this.movieService.isInWishlist(movieId)) {
    this.movieService.removeFromWishlist(movieId);
  } else {
    this.movieService.addToWishlist(movieId);
  }
}


  // Check if movie is in wishlist (for heart icon state)
  isInWishlist(movieId: number): boolean {
    return this.movieService.isInWishlist(movieId);
  }

  logedin(): boolean {
    return this.authService.isLoggedIn();
  }

}
