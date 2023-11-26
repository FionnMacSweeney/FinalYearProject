import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.page.html',
  styleUrls: ['./tracks.page.scss'],
})
export class TracksPage implements OnInit {
  circuits: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getTracks().subscribe(data => {
      this.circuits = data.MRData.CircuitTable.Circuits;
    });
  }

  onTrackSelect(trackId: string) {
    console.log('Selected Track ID:', trackId);

    // Save the selected track ID to localStorage
    localStorage.setItem('selectedTrack', trackId);

    // Navigate to the tyre selection page
    this.router.navigate(['/tyre-selection']);
  }
}


