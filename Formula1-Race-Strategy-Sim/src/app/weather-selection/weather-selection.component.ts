import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-selection',
  templateUrl: './weather-selection.page.html',
  styleUrls: ['./weather-selection.page.scss'],
})
export class WeatherSelectionPage {
  selectedWeather: string = 'mild'; // Default selection

  constructor(private router: Router) {}

  submitWeather() {
    localStorage.setItem('selectedWeather', this.selectedWeather);
    // Navigate to the next page
    this.router.navigateByUrl('/tyre-selection'); 
  }
}

