import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventItemComponent } from './event-item.component';

describe('EventItemComponent', () => {
  let component: EventItemComponent;
  let fixture: ComponentFixture<EventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
