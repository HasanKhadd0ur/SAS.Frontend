export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}


export interface UserInterest {
  id?: string;
  userId?: string;
  interestName: string;
  radiusInKm: number;
  location: Location;
}
