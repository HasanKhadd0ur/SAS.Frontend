import { TestBed } from '@angular/core/testing';

import { PipelineConfigService } from './pipeline-config.service';

describe('PipelineConfigService', () => {
  let service: PipelineConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipelineConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
