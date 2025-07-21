import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapingTaskDetailsComponent } from './scraping-task-details.component';

describe('ScrapingTaskDetailsComponent', () => {
  let component: ScrapingTaskDetailsComponent;
  let fixture: ComponentFixture<ScrapingTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapingTaskDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapingTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
