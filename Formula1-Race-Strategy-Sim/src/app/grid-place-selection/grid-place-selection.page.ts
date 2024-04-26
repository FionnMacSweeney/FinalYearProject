import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-grid-place-selection',
  templateUrl: './grid-place-selection.page.html',
  styleUrls: ['./grid-place-selection.page.scss'],
})
export class GridPlaceSelectionPage implements OnInit {
  gridPositions: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  selectedGridPosition!: number;

  constructor(private router: Router, private http: HttpClient) {} // Add HttpClient to the constructor

  ngOnInit() {}

  onGridPositionSelect() {
    console.log('Selected Grid Position:', this.selectedGridPosition);
    localStorage.setItem('selectedGridPosition', this.selectedGridPosition.toString());
    this.startRaceSimulation();
  }

  private startRaceSimulation() {
    const simulationData = this.collectSimulationData();
    this.http.post('http://localhost:3000/start-simulation', simulationData)
      .subscribe({
        next: (results) => {
          console.log('Simulation Results:', results);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }

  private collectSimulationData(): any {
    // Collect and return data needed for simulation
    return {
      gridPosition: this.selectedGridPosition,
      
    };
  }
}


