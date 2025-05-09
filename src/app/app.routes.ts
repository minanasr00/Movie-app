import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

export const routes: Routes = [
  { path: "", component: HomeComponent ,title:"Movie App" },
  { path: "wish-list", component: WishListComponent },
  { path: "movie-details/:id", component: MovieDetailsComponent },
  {path:"**" , redirectTo : '' ,pathMatch:"full" }
];
