export interface PositionDetail {
  driver_id: string;
  position: number;
}

export interface LapResult {
  lap: number;
  positions: PositionDetail[];
}

export interface SimulationResponse {
  startingPositions: string[];
  lapResults: LapResult[];
  finalPositions: { [key: string]: number };
}

export interface StartingPosition {
  position: number;
  driverName: string;
}
