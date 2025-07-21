import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PipelineConfig } from '../../models/pipeline-config.model';
import { PipelineConfigService } from '../../services/pipeline-config.service';

@Component({
  selector: 'app-pipeline-configs-edit',
  templateUrl: './pipeline-configs-edit.component.html',
  standalone:false,
  styleUrls: ['./pipeline-configs-edit.component.css']
})
export class PipelineConfigsEditComponent implements OnInit {
  pipelineForm!: FormGroup;
  isLoading = false;
  isSaving = false;
  pipelineId!: string;

  constructor(
    private fb: FormBuilder,
    private pipelineService: PipelineConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get stages(): FormArray {
    return this.pipelineForm.get('stages') as FormArray;
  }

  ngOnInit(): void {
    this.pipelineId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();
    if (this.pipelineId) {
      this.loadPipeline(this.pipelineId);
    }
  }

  initForm() {
    this.pipelineForm = this.fb.group({
      pipelineKey: ['', Validators.required],
      version: [1, [Validators.required, Validators.min(1)]],
      stages: this.fb.array([])
    });
  }

  loadPipeline(id: string) {
    this.isLoading = true;
    this.pipelineService.getById(id).subscribe({
      next: (config) => {
        this.pipelineForm.patchValue({
          pipelineKey: config.pipelineKey,
          version: config.version,
        });

        this.stages.clear();
        config.stages?.forEach(stage => {
          this.stages.push(this.fb.group({
            stageName: [stage.stageName || '', Validators.required]
          }));
        });

        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  addStage() {
    this.stages.push(this.fb.group({
      stageName: ['', Validators.required]
    }));
  }

  removeStage(index: number) {
    this.stages.removeAt(index);
  }

  saveChanges() {
    if (this.pipelineForm.invalid) {
      this.pipelineForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const updatedConfig: PipelineConfig = {
      id: this.pipelineId,
      pipelineKey: this.pipelineForm.value.pipelineKey,
      version: this.pipelineForm.value.version,
      stages: this.pipelineForm.value.stages // Make sure stages match your DTO shape
    };

    this.pipelineService.update(updatedConfig).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/management/settings/pipeline-configs']);
      },
      error: () => {
        this.isSaving = false;
        alert('Error saving pipeline config.');
      }
    });
  }
}
