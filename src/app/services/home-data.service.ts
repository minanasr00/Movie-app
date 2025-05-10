import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {
  recommendations: any[] = [];
private apiUrl = "https://api.themoviedb.org/3/movie/"
private apiKey="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmJkNzA4ZmJiNTM1NTU2YjdiZDVhNmNmYWM4YzBkNyIsIm5iZiI6MTc0NjYxNzQ0NS43NTksInN1YiI6IjY4MWI0NDY1NzcyOTIwNDA2NjlmMDQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qL7BoehEDs8kVMo1oKoLp6V4OVYwbWuRKqh74bHIVag"
  constructor(private http: HttpClient) { }

  getMovies(lang:string = "en-US" , page: number = 1): Observable<any[]> {
    return this.http.get<{ results: Movie[] }>(`${this.apiUrl}/now_playing`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
      params: {
        page: page,
        language :lang
      }
    }).pipe(
      catchError(this.handleError), map((response) =>response.results)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  searchMovies(query: string, page: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`;
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });
  }


getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  getRecommendations(id: number) {
    this.http
      .get(`${this.apiUrl}${id}/recommendations?api_key=${this.apiKey}`)
      .subscribe((res: any) => {
        this.recommendations = res.results;
      });
  }
}


