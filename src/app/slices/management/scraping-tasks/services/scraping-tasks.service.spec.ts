import { TestBed } from '@angular/core/testing';

import { ScrapingTasksService } from './scraping-tasks.service';

describe('ScrapingTasksService', () => {
  let service: ScrapingTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapingTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
