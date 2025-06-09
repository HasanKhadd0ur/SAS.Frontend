import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapingDomainDetailsComponent } from './scraping-domain-details.component';

describe('ScrapingDomainDetailsComponent', () => {
  let component: ScrapingDomainDetailsComponent;
  let fixture: ComponentFixture<ScrapingDomainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapingDomainDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapingDomainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
