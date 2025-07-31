import { TestBed } from '@angular/core/testing';

import { BlockedTermsService } from './blocked-terms.service';

describe('BlockedTermsService', () => {
  let service: BlockedTermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockedTermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
