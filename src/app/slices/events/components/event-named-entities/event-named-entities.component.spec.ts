import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNamedEntitiesComponent } from './event-named-entities.component';

describe('EventNamedEntitiesComponent', () => {
  let component: EventNamedEntitiesComponent;
  let fixture: ComponentFixture<EventNamedEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventNamedEntitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventNamedEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
