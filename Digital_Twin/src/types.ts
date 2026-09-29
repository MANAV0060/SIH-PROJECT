export type ActiveScreen = 
  | 'landing-page'
  | 'legacy-landing-page'
  | 'digital-twin-3d'
  | 'telemetry-cockpit'
  | 'predictive-prognostics'
  | 'mission-contingency'
  | 'cbm-and-logistics';

export interface AirframeRecord {
  id: string;
  subsystemFocus: string;
  totalHours: string;
  health: number;
  healthColor: 'green' | 'amber' | 'blue' | 'red';
  projectedRul: string;
  actionRequired: string;
  status: string;
  statusColor: 'green' | 'amber' | 'blue' | 'red';
}

export interface SpareItem {
  partNumber: string;
  description: string;
  stock: number;
  transit: number;
  transitNote: string;
  risk: 'LOW' | 'MED' | 'HIGH CRITICAL';
  preAllocatedTo: string;
}

export interface DivertAirfield {
  id: string;
  name: string;
  designation: string;
  distanceNM: number;
  fuelReqKG: number;
  ete: string;
  riskAssessment: string;
  riskLevel: 'low' | 'moderate' | 'elevated';
  actionStatus: 'selectable' | 'standby' | 'restricted';
}

export interface WhatIfParams {
  flightLevel: number;
  isaDeviation: number;
  powerRegime: number; // 65, 75, 92, 100
  cyl3Leakage: number; // percentage
  heatSoak: number; // deg C
  wastegateSeized: boolean;
}
