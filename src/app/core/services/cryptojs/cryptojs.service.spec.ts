import { TestBed } from '@angular/core/testing';

import { CryptojsService } from './cryptojs.service';

describe('CryptojsService', () => {
  let service: CryptojsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptojsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
