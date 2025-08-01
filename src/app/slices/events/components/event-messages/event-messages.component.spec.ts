import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMessagesComponent } from './event-messages.component';

describe('EventMessagesComponent', () => {
  let component: EventMessagesComponent;
  let fixture: ComponentFixture<EventMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
