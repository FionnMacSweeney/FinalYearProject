import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-drivers', // The component's CSS element selector
  templateUrl: './drivers.page.html', // The location of the component's template file
  styleUrls: ['./drivers.page.scss'] // The location of the component's private CSS styles
})

export class DriversPage implements OnInit {
  teamId!: string;
  drivers: any[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.teamId = params['teamId'];
      
      this.dataService.getDrivers(this.teamId).subscribe(data => {
        this.drivers = data;
      });
    });
  }

 /* onDriverSelect(driverId: string) {
    console.log('Selected driver:', driverId);
   
  }*/

  fetchDrivers() {
    this.dataService.getDrivers(this.teamId).subscribe(data => {
      console.log('Drivers data:', data); // Check the structure of 'data'
      this.drivers = data;
    }, error => {
      console.error('Error fetching drivers:', error);
    });
  }
}

