import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsByAreaComponent } from './events-by-area.component';

describe('EventsByAreaComponent', () => {
  let component: EventsByAreaComponent;
  let fixture: ComponentFixture<EventsByAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsByAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsByAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
