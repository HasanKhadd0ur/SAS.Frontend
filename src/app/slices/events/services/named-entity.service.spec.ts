import { TestBed } from '@angular/core/testing';

import { NamedEntityService } from './named-entity.service';

describe('NamedEntityService', () => {
  let service: NamedEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamedEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
