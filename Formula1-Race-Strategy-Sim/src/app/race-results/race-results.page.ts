// race-results.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { switchMap, startWith, take } from 'rxjs/operators';
import { LapResult, PositionDetail } from '../simulation-response.interface';

@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.page.html',
  styleUrls: ['./race-results.page.scss'],
})
export class RaceResultsPage implements OnInit, OnDestroy {
  lapResults: LapResult[] = [];
  currentLapResults: PositionDetail[] = [];
  currentLap = 0;
  totalLaps = 0;
  displayInterval: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    this.loadRaceResults();
  }

  loadRaceResults() {
    const lapData = localStorage.getItem('lapResults');
    if (lapData) {
      this.lapResults = JSON.parse(lapData);
      this.totalLaps = this.lapResults.length;
      this.startDisplayingLaps();
    }
  }

  startDisplayingLaps() {
    this.displayInterval = interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => {
          if (this.currentLap < this.totalLaps) {
            this.currentLapResults = this.lapResults[this.currentLap].positions;
            this.currentLap++;
            return []; // Return empty array or handle the end of the interval cycle
          } else {
            this.displayInterval.unsubscribe(); // Stop the interval when laps are done
            return [];
          }
        }),
        take(this.totalLaps)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.displayInterval.unsubscribe();
  }
}

