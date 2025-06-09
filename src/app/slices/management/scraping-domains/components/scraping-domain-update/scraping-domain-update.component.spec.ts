import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapingDomainUpdateComponent } from './scraping-domain-update.component';

describe('ScrapingDomainUpdateComponent', () => {
  let component: ScrapingDomainUpdateComponent;
  let fixture: ComponentFixture<ScrapingDomainUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapingDomainUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapingDomainUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
