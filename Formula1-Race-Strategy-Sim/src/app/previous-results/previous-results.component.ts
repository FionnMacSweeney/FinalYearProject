
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; // Import the 'of' operator from rxjs





@Component({
  selector: 'app-previous-results',
  templateUrl: './previous-results.component.html',
  styleUrls: ['./previous-results.component.scss']
})

export class PreviousResultsComponent implements OnInit {
  previousResults: Observable<any[]> = of([]); // Initialize with an empty Observable

  // Constructor remains the same
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    // Subscribe to the authState to see if the user is logged in
    this.afAuth.authState.subscribe(user => {
      console.log(user); // This will log the user object to the console
      this.fetchPreviousResults(); // Call fetchPreviousResults after confirming user state
    });
  }

  fetchPreviousResults() {
    this.previousResults = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('finalPositions', ref =>
            ref.where('userId', '==', user.uid)
          ).valueChanges({ idField: 'id' });
        } else {
          // If there's no user, return an empty observable array.
          return of([]);
        }
      })
    );
    
  }
  
  toggleDetails(result: any) {
    // Since the result object is a plain object, we directly mutate it to toggle showDetails
    result.showDetails = !result.showDetails;
  }
  
}
