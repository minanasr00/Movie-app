import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeDataService } from '../../services/home-data.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-search-movie',
  imports: [ FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent implements OnInit {
  query = '';
  movies: any[] = [];
  page: number = 1;
  loaded:boolean = false;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private movieService: HomeDataService) { }

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

  //Go to movie details
  getMovieDetails(id: number) {
    console.log(id);
    this.router.navigate(['/movie', id]);
  }
}
