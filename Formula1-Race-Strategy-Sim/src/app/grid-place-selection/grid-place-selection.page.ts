// grid-place-selection.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-place-selection',
  templateUrl: './grid-place-selection.page.html',
  styleUrls: ['./grid-place-selection.page.scss'],
})
export class GridPlaceSelectionPage implements OnInit {
  gridPositions: number[] = Array.from({ length: 20 }, (_, i) => i + 1); // Assuming 20 grid positions
  selectedGridPosition!: number;

  constructor(private router: Router) {}

  ngOnInit() {}

  onGridPositionSelect() {
    console.log('Selected Grid Position:', this.selectedGridPosition);
    // Save the selection and navigate to the next step
    localStorage.setItem('selectedGridPosition', this.selectedGridPosition.toString());
    // this.router.navigate(['/next-step']); // Navigate to the next step in your app
  }
}

