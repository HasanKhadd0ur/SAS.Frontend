import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineConfigsEditComponent } from './pipeline-configs-edit.component';

describe('PipelineConfigsEditComponent', () => {
  let component: PipelineConfigsEditComponent;
  let fixture: ComponentFixture<PipelineConfigsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineConfigsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineConfigsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
