import { TestBed } from '@angular/core/testing';

import { DataSourcesService } from './datasources.service';

describe('DatasourceService', () => {
  let service: DataSourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
