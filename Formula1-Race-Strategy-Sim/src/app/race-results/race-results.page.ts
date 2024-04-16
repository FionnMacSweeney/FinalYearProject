// race-results.page.ts
import { Component, OnInit } from '@angular/core';

interface RaceResult {
  driverName: string;
  position: string | number; // Adjust based on the actual data structure
}


@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.page.html',
  styleUrls: ['./race-results.page.scss'],
})
export class RaceResultsPage implements OnInit {
  raceResults: RaceResult[] = [];

  constructor() {}

  ngOnInit() {
    this.loadRaceResults();
  }

  loadRaceResults() {
    const simulationData = localStorage.getItem('simulationData');
    if (simulationData) {
      const data = JSON.parse(simulationData);
      this.raceResults = Object.entries(data.RaceResults).map(([driverName, position]): RaceResult => ({
        driverName,
        position: position as string | number, // Cast position to the correct type
      }));
      
    }
  }
}
