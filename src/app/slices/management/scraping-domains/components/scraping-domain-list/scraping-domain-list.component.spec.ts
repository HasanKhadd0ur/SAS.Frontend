import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapingDomainListComponent } from './scraping-domain-list.component';

describe('ScrapingDomainListComponent', () => {
  let component: ScrapingDomainListComponent;
  let fixture: ComponentFixture<ScrapingDomainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapingDomainListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapingDomainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
