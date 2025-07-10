import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  // Static variable approach
  public static managementServiceUrl = environment.SERVER_URL + '/management/api';
  public static eventtServiceUrl = environment.SERVER_URL + '/events/api';

  // Or as a getter method
  getManagementServiceUrl(): string {
    return  environment.SERVER_URL + 'management/api';
  }
  getEventServiceUrl(): string {
    return  environment.SERVER_URL + 'events/api';
  }

  // You can add other URLs similarly
  getApiUrl(): string {
    return environment.URLAPI;
  }
}
