import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapersListComponent } from './scrapers-list.component';

describe('ScrapersListComponent', () => {
  let component: ScrapersListComponent;
  let fixture: ComponentFixture<ScrapersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
