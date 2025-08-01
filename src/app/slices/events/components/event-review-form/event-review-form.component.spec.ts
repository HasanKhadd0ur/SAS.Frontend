import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReviewFormComponent } from './event-review-form.component';

describe('EventReviewFormComponent', () => {
  let component: EventReviewFormComponent;
  let fixture: ComponentFixture<EventReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventReviewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
