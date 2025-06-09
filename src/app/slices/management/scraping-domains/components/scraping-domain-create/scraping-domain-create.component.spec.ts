import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapingDomainCreateComponent } from './scraping-domain-create.component';

describe('ScrapingDomainCreateComponent', () => {
  let component: ScrapingDomainCreateComponent;
  let fixture: ComponentFixture<ScrapingDomainCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapingDomainCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapingDomainCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
