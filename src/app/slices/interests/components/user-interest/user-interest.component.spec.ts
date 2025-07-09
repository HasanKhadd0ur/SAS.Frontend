import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterestComponent } from './user-interest.component';

describe('UserInterestComponent', () => {
  let component: UserInterestComponent;
  let fixture: ComponentFixture<UserInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInterestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
