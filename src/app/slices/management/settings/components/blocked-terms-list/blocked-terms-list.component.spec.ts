import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedTermsListComponent } from './blocked-terms-list.component';

describe('BlockedTermsListComponent', () => {
  let component: BlockedTermsListComponent;
  let fixture: ComponentFixture<BlockedTermsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockedTermsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockedTermsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
