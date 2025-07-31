import { TestBed } from '@angular/core/testing';

import { LocationConfigService } from './location-config.service';

describe('LocationConfigService', () => {
  let service: LocationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
