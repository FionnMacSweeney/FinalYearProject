import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructors: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getConstructors().subscribe(data => {
      this.constructors = data;
      console.log('Constructors:', this.constructors); // Check the structure of constructors array
    });
  }
  

  
  onTeamSelect(constructorId: string) {
    console.log("Selected team constructorId:", constructorId); // Log the constructorId
    this.router.navigate(['/drivers'], { queryParams: { constructorId: constructorId } });
  }
  


  // ... other methods
}
