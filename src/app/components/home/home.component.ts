import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';;
import { HomeDataService } from './../../services/home-data.service';
import { Observable, tap } from 'rxjs';

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
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  movies$ !: Observable<Movie[]>;
  pageNumber: number = 1;
  count !: number;
  maxVisiblePages : number = 5;

  constructor(private HomeDataService: HomeDataService) {
    this.movies$ = this.HomeDataService.getMovies().pipe(
      tap((movies$: Movie[]) => {
        console.log(movies$);
        this.count = movies$.length+1;
      })
    )
  }
  changePage(page: number, count: number, li: HTMLLIElement) {
    li.classList.add('.page-item.active');
    this.pageNumber = page;
    if (page < 1) {
      this.movies$ = this.HomeDataService.getMovies("en-US", 1)
    } else if (page > count + 1) {
      this.movies$ = this.HomeDataService.getMovies("en-US", count + 1)
    } else {
      this.movies$ = this.HomeDataService.getMovies("en-US", page)
     }
  }

  addToWishlist(i:HTMLElement,id:number) {
    i.classList.toggle('text-warning');
  }

  getMovieDetails(id: number) {
    console.log(id);

  }

}
