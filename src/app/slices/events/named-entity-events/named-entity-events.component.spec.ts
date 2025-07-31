import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedEntityEventsComponent } from './named-entity-events.component';

describe('NamedEntityEventsComponent', () => {
  let component: NamedEntityEventsComponent;
  let fixture: ComponentFixture<NamedEntityEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NamedEntityEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamedEntityEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
