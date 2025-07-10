import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceDetailsComponent } from './data-source-details.component';

describe('DataSourceDetailsComponent', () => {
  let component: DataSourceDetailsComponent;
  let fixture: ComponentFixture<DataSourceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSourceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
