import { TestBed } from '@angular/core/testing';

import { StrategyService } from './strategy.service';

describe('StrategyService', () => {
  let service: StrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
