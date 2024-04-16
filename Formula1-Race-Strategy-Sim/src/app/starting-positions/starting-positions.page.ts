// starting-positions.page.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SimulationResponse, StartingPosition } from '../simulation-response.interface';

@Component({
  selector: 'app-starting-positions',
  templateUrl: './starting-positions.page.html',
  styleUrls: ['./starting-positions.page.scss'],
})
export class StartingPositionsPage implements OnInit {
  startingPositions: StartingPosition[] = []; // Now expecting an array of strings

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchStartingPositions();
  }

  fetchStartingPositions() {
    const simulationParams = {
      tyreCompound: localStorage.getItem('selectedTyreCompound'),
    };

    this.http.post<SimulationResponse>('http://localhost:3000/api/start-simulation', simulationParams)
      .subscribe({
        next: (response) => {
          // Save the entire simulation response to local storage for later use
          localStorage.setItem('simulationData', JSON.stringify(response));

          // Map only the starting positions for display
          this.startingPositions = response.startingPositions.map((driverName, index) => ({
            position: index + 1,
            driverName: driverName,
          }));
        },
        error: (error) => {
          console.error('Failed to fetch starting positions:', error);
        },
      });
  }

  goToRaceResults() {
    // Save the race results to local storage or a service if not already done
    // Then navigate to the race results page
    this.router.navigateByUrl('/race-results');
  }
  
}



