import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WishlistComponent } from './components/wish-list/wish-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { LoginComponent } from './components/login/login.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: "", component: HomeComponent ,title:"Movie App" },
    { path: 'wish-list', component: WishlistComponent, canActivate: [AuthGuard] },

  { path: "movie/:id", component: MovieDetailsComponent },
  {path: "search", component: SearchMovieComponent},
    { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'user', component: BoardUserComponent },
  {path:"**" , redirectTo : '' ,pathMatch:"full" }
];
