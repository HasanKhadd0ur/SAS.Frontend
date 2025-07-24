import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventLocationComponent } from './update-event-location.component';

describe('UpdateEventLocationComponent', () => {
  let component: UpdateEventLocationComponent;
  let fixture: ComponentFixture<UpdateEventLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEventLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
