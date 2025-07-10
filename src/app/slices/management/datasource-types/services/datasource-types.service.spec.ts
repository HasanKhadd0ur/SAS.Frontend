import { TestBed } from '@angular/core/testing';

import { DatasourceTypesService } from './datasource-types.service';

describe('DatasourceTypesService', () => {
  let service: DatasourceTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasourceTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
