import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';

export const routes: Routes = [
  { path: "", component: HomeComponent ,title:"Movie App" },
  { path: "wish-list", component: WishListComponent },
  { path: "movie-details/:id", component: MovieDetailsComponent },
  {path: "search", component: SearchMovieComponent},
  {path:"**" , redirectTo : '' ,pathMatch:"full" }
];
