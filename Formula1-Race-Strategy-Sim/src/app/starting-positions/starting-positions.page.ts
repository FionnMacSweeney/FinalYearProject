import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
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

  constructor(
    private http: HttpClient, 
    private router: Router,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth, 
    
  ) {}

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
          console.log('Received simulation response:', response); // Debugging line to check the response structure
          if (response.lapResults && response.lapResults.length > 0 && response.lapResults[0].positions) {
            localStorage.setItem('lapResults', JSON.stringify(response.lapResults));
            localStorage.setItem('finalPositions', JSON.stringify(response.finalPositions));

            // Correctly mapping over positions if they exist and are in the expected format
            this.startingPositions = response.lapResults[0].positions.map((positionDetail, index) => ({
              position: index + 1, // Use 1-based indexing for display
              driverName: positionDetail.driver_id, 
            }));

            // Save final positions to Firebase
            this.saveFinalPositionsToFirebase(response.finalPositions);
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        error: (error) => {
          console.error('Failed to fetch starting positions:', error);
        },
      });
  }

  

  private saveFinalPositionsToFirebase(finalPositions: any): void {
    this.auth.currentUser.then(user => {
      if (user) {
        this.firestore.collection('finalPositions').add({
          userId: user.uid,
          finalPositions: finalPositions,
          timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        })
        .then(() => console.log('Final positions saved to Firestore.'))
        .catch(error => console.error('Error saving to Firestore:', error));
      } else {
        console.error('No authenticated user. Cannot save to Firestore.');
      }
    });
  }

  goToRaceResults() {
    this.router.navigateByUrl('/race-results');
  }
}






