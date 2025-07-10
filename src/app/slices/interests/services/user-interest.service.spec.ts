import { TestBed } from '@angular/core/testing';

import { UserInterestService } from './user-interest.service';

describe('UserInterestService', () => {
  let service: UserInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
