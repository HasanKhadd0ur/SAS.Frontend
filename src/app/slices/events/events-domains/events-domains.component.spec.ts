import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDomainsComponent } from './events-domains.component';

describe('EventsDomainsComponent', () => {
  let component: EventsDomainsComponent;
  let fixture: ComponentFixture<EventsDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsDomainsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
