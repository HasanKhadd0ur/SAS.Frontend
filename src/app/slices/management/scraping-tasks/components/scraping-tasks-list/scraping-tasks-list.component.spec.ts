import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapingTasksListComponent } from './scraping-tasks-list.component';

describe('ScrapingTasksListComponent', () => {
  let component: ScrapingTasksListComponent;
  let fixture: ComponentFixture<ScrapingTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapingTasksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapingTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
