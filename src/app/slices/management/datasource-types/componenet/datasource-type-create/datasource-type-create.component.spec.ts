import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceTypeCreateComponent } from './datasource-type-create.component';

describe('DatasourceTypeCreateComponent', () => {
  let component: DatasourceTypeCreateComponent;
  let fixture: ComponentFixture<DatasourceTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatasourceTypeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasourceTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
