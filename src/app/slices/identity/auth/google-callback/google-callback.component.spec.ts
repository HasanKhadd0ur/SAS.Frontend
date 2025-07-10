import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCallbackComponent } from './google-callback.component';

describe('GoogleCallbackComponent', () => {
  let component: GoogleCallbackComponent;
  let fixture: ComponentFixture<GoogleCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleCallbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
