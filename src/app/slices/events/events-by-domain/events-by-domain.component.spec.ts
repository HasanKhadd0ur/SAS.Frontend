import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsByDomainComponent } from './events-by-domain.component';

describe('EventsByDomainComponent', () => {
  let component: EventsByDomainComponent;
  let fixture: ComponentFixture<EventsByDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsByDomainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsByDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
