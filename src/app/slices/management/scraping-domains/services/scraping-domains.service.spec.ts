import { TestBed } from '@angular/core/testing';

import { ScrapingDomainsService } from './scraping-domains.service';

describe('ScrapingDomainsService', () => {
  let service: ScrapingDomainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapingDomainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
