import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineConfigsListComponent } from './pipeline-configs-list.component';

describe('PipelineConfigsListComponent', () => {
  let component: PipelineConfigsListComponent;
  let fixture: ComponentFixture<PipelineConfigsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineConfigsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineConfigsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
