import { Page } from './../../../../node_modules/ngx-pagination/lib/pagination-controls.directive.d';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeDataService } from '../../services/home-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-movie',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent implements OnInit {
  query = '';
  movies: any[] = [];
  page: number = 1;
  loaded:boolean = false;
  constructor(private route: ActivatedRoute,  private movieService: HomeDataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.page = 1;
      this.searchMovies();
    });
  }

  searchMovies(): void {
    this.movieService.searchMovies(this.query, this.page).subscribe(data => {
      this.movies = data.results;
      this.loaded = true;
    });
  }


  onPageChange(page: number) {
    this.page = page;
    this.searchMovies();
  }
}
