import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { HomeDataService } from './../../services/home-data.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterOutlet],
templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private HomeDataService: HomeDataService) { }
  ngOnInit(): void {
    this.HomeDataService.getMovies().subscribe({

      next:(data)=>{ console.log(data);},
      error: (error)=>{console.log(error.massage);
      }
      })
  }
}
