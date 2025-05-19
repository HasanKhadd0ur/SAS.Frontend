import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaillyEventsComponent } from './dailly-events.component';

describe('DaillyEventsComponent', () => {
  let component: DaillyEventsComponent;
  let fixture: ComponentFixture<DaillyEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaillyEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaillyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
