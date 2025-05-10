import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-search-movie',
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent implements OnInit {
  query = '';
  movies: any[] = [];
  totalResults = 0;
  currentPage = 1;
  itemsPerPage = 20;
  loaded = false;
  constructor(private route: ActivatedRoute,  private homeDataService: HomeDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params['query'];
      this.currentPage = 1;
      this.fetchMovies();
    });
  }

  fetchMovies(): void {
    this.movieService.searchMovies(this.query, this.currentPage).subscribe(data => {
      this.movies = data.results;
      this.totalResults = data.total_results;
      this.loaded = true;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchMovies();
  }
}
