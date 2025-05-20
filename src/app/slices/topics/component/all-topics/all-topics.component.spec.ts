import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTopicsComponent } from './all-topics.component';

describe('AllTopicsComponent', () => {
  let component: AllTopicsComponent;
  let fixture: ComponentFixture<AllTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTopicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
