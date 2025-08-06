import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRangeComponent } from './event-range.component';

describe('EventRangeComponent', () => {
  let component: EventRangeComponent;
  let fixture: ComponentFixture<EventRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
