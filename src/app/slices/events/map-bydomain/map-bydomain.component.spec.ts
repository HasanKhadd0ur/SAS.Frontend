import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBydomainComponent } from './map-bydomain.component';

describe('MapBydomainComponent', () => {
  let component: MapBydomainComponent;
  let fixture: ComponentFixture<MapBydomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapBydomainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapBydomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
