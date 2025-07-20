import { TestBed } from '@angular/core/testing';

import { ScrapersService } from './scrapers.service';

describe('ScrapersService', () => {
  let service: ScrapersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
