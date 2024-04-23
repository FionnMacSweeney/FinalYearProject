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
  startingPositions: StartingPosition[] = [];

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
          console.log('Received simulation response:', response);  // Debugging line to check the response structure
          if (response.lapResults && response.lapResults.length > 0 && response.lapResults[0].positions) {
            localStorage.setItem('lapResults', JSON.stringify(response.lapResults));
            localStorage.setItem('finalPositions', JSON.stringify(response.finalPositions));

            // Correctly mapping over positions if they exist and are in the expected format
            this.startingPositions = response.lapResults[0].positions.map((positionDetail, index) => ({
              position: index + 1,  // Use 1-based indexing for display
              driverName: positionDetail.driver_id, // Assuming you have a mechanism to translate driver_id to a driver's name
            }));
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        error: (error) => {
          console.error('Failed to fetch starting positions:', error);
        },
      });
  }

  goToRaceResults() {
    this.router.navigateByUrl('/race-results');
  }
}





