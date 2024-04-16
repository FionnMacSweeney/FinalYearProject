// src/app/simulation-response.interface.ts
export interface StartingPosition {
  position: number;
  driverName: string;
    // Add any other properties here
  }
  
  export interface SimulationResponse {
    startingPositions: string[];
    raceResults: { [key: string]: number | string };
    }

   export interface RaceResult {
      driverName: string;
      result: string | number; // Assuming this fits your data model
    }
  