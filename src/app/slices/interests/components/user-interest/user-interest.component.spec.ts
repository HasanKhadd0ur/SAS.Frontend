import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterestsComponent } from './user-interest.component';

describe('UserInterestComponent', () => {
  let component: UserInterestsComponent;
  let fixture: ComponentFixture<UserInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInterestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
