import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineConfigsCreateComponent } from './pipeline-configs-create.component';

describe('PipelineConfigsCreateComponent', () => {
  let component: PipelineConfigsCreateComponent;
  let fixture: ComponentFixture<PipelineConfigsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineConfigsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineConfigsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
