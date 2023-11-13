import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust if your API URL is different

  constructor(private http: HttpClient) {}

  getConstructors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/constructors`);
  }

  getDrivers(teamId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/teams/${teamId}/drivers`);
  }

 
  getDriversForTeam(constructorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/teams/${constructorId}/drivers`);
  }

  

  // ... other methods
}
