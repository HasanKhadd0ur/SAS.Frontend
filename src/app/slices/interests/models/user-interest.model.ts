export interface Location {
  latitude: number;
  longitude: number;
}

export interface UserInterest {
  id?: string;
  userId?: string;
  interestName: string;
  radiusInKm: number;
  location: Location;
}
