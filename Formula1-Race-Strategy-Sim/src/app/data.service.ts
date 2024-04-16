import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  
  

  getConstructors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/constructors`);
  }

  getTeamRatings(): Observable<{[key: string]: number}> {
    // Example endpoint, adjust according to your actual API
    return this.http.get<{[key: string]: number}>('/api/team-ratings');
  }

  getDrivers(teamId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/teams/${teamId}/drivers`);
  }

 
  getDriversForTeam(constructorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/teams/${constructorId}/drivers`);
  }

 
  getTracks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/circuits`);
  }

  
}

const TYRE_COMPOUNDS = ['Soft', 'Medium', 'Hard', 'Intermediate', 'Wet'];
