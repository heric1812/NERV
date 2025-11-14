export type AuthResponse = Operator;

export type Operator = {
  token: string;
  clearance: string;
  pilotId: string;
}

export type SyncResponse = {
  pilotId: string;
  syncRate: number;
  timestamp: string;
}