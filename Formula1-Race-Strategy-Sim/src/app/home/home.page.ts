import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
  imageUrl?: string;
  // other properties that your constructor objects have
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
      console.log('Constructors with images:', this.constructors);
    });
  }

  

  
  onTeamSelect(constructorId: string) {
    console.log("Selected team constructorId:", constructorId); // Log the constructorId
    this.router.navigate(['/drivers'], { queryParams: { constructorId: constructorId } });
  }
  


  // ... other methods
}
