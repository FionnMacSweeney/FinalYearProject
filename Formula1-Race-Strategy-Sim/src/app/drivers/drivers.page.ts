import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-drivers', 
  templateUrl: './drivers.page.html', 
  styleUrls: ['./drivers.page.scss'] 
})

export class DriversPage implements OnInit {
  teamId!: string;
  drivers: any[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {}

  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['constructorId']) {
        this.dataService.getDriversForTeam(params['constructorId']).subscribe(drivers => {
          this.drivers = drivers;
          console.log("team recieved");
        });
      } else {
        console.log('No constructorId provided');
      }
    });
  }
  

  

  onDriverSelect(driverId: string) {
    console.log('Selected driver:', driverId);
  
    // local storage
    localStorage.setItem('selectedTeam', this.teamId);
    localStorage.setItem('selectedDriver', driverId);
  
    // Navigate to the tracks page
    this.router.navigate(['/tracks']);
  }
  

  fetchDrivers() {
    this.dataService.getDrivers(this.teamId).subscribe(data => {
      console.log('Drivers data:', data); // Check the structure of 'data'
      this.drivers = data;
    }, error => {
      console.error('Error fetching drivers:', error);
    });
  }
}

