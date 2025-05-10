import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie1 } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey ="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmJkNzA4ZmJiNTM1NTU2YjdiZDVhNmNmYWM4YzBkNyIsIm5iZiI6MTc0NjYxNzQ0NS43NTksInN1YiI6IjY4MWI0NDY1NzcyOTIwNDA2NjlmMDQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qL7BoehEDs8kVMo1oKoLp6V4OVYwbWuRKqh74bHIVag"
  private apiUrl = 'https://api.themoviedb.org/3/movie/';

  constructor(private http: HttpClient) {}

  // Fetch movie details by ID
  getMovieDetails(movieId: number): Observable<Movie1> {
    return this.http.get<any>(`${this.apiUrl}${movieId}`, {
      headers: {
        Authorization:`${this.apiKey}`,
      },
    }).pipe(
      map((data: any) => ({
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
        overview: data.overview,
        release_date: data.release_date
      })),
      catchError(error => {
        console.error('Error fetching movie:', error);
        return throwError(() => new Error('Movie not found'));
      })
    );
  }

  // Get wishlist from localStorage
  getWishlist(): number[] {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  // Add movie to wishlist
  addToWishlist(movieId: number): void {
    const wishlist = this.getWishlist();
    if (!wishlist.includes(movieId)) {
      wishlist.push(movieId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }

  // Remove movie from wishlist
  removeFromWishlist(movieId: number): void {
    const wishlist = this.getWishlist().filter(id => id !== movieId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

    isInWishlist(movieId: number): boolean {
    return this.getWishlist().includes(movieId);
  }
}
