import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceTypesComponent } from './datasource-types.component';

describe('DatasourceTypesComponent', () => {
  let component: DataSourceTypesComponent;
  let fixture: ComponentFixture<DataSourceTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSourceTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSourceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
