import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFooterComponent } from './shared-footer.component';

describe('SharedFooterComponent', () => {
  let component: SharedFooterComponent;
  let fixture: ComponentFixture<SharedFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
