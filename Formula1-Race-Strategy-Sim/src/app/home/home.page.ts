// home.page.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
  imageUrl?: string;
  rating?: number; // Add this to include the team rating
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructors: Constructor[] = []; // Use the Constructor interface

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getConstructors().subscribe((data: Constructor[]) => {
      this.constructors = data.map((constructor: Constructor) => ({
        ...constructor,
        imageUrl: `./assets/images/${constructor.constructorId}.png`
      }));

      // Fetch team ratings and merge with constructor data
      this.dataService.getTeamRatings().subscribe((ratings: {[key: string]: number}) => {
        this.constructors = this.constructors.map(constructor => ({
          ...constructor,
          rating: ratings[constructor.constructorId] // Assumes ratings is an object with constructorId as keys
        }));
      });

      console.log('Constructors with images and ratings:', this.constructors);
    });
  }

  onTeamSelect(constructorId: string) {
    console.log("Selected team constructorId:", constructorId);
    this.router.navigate(['/drivers'], { queryParams: { constructorId: constructorId } });
  }

  // ... other methods
}

