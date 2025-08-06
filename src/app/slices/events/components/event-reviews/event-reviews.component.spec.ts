import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReviewsComponent } from './event-reviews.component';

describe('EventReviewsComponent', () => {
  let component: EventReviewsComponent;
  let fixture: ComponentFixture<EventReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
