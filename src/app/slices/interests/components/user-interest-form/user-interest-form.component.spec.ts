import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterestFormComponent } from './user-interest-form.component';

describe('UserInterestFormComponent', () => {
  let component: UserInterestFormComponent;
  let fixture: ComponentFixture<UserInterestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInterestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInterestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
