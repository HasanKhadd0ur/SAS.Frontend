import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventInfoComponent } from './update-event-info.component';

describe('UpdateEventInfoComponent', () => {
  let component: UpdateEventInfoComponent;
  let fixture: ComponentFixture<UpdateEventInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEventInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
