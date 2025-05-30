import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomeDataService } from './../../services/home-data.service';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  recommendations: any[] = [];
  movieDetails: any;
  private baseImageUrl = 'https://image.tmdb.org/t/p/w500';
  baseUrl: any;

  constructor(
    private route: ActivatedRoute,
    private homeDataService: HomeDataService,
    private http: HttpClient,
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getMovieDetails(id);
    this.getRecommendations(id);
  }

  getMovieDetails(id: number) {
    this.homeDataService.getMovieDetails(id).subscribe((data) => {
      this.movieDetails = data;
      console.log(this.movieDetails); // للتأكد من البيانات
    });
  }

  getRecommendations(id: number) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const headers = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmJkNzA4ZmJiNTM1NTU2YjdiZDVhNmNmYWM4YzBkNyIsIm5iZiI6MTc0NjYxNzQ0NS43NTksInN1YiI6IjY4MWI0NDY1NzcyOTIwNDA2NjlmMDQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qL7BoehEDs8kVMo1oKoLp6V4OVYwbWuRKqh74bHIVag`,
      },
    };

    this.http.get(apiUrl, headers).subscribe((res: any) => {
      this.recommendations = res.results;
      console.log('Recommendations:', this.recommendations);
    });
  }

  getImage(path: string) {
    return this.baseImageUrl + path;
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

}
