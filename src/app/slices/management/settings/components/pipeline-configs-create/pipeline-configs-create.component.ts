import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PipelineConfigService } from '../../services/pipeline-config.service';
import { PipelineConfig } from '../../models/pipeline-config.model';

@Component({
  selector: 'app-pipeline-config-create',
  templateUrl: './pipeline-configs-create.component.html',
  standalone:false,
  styleUrls: ['./pipeline-configs-create.component.css']
})
export class PipelineConfigsCreateComponent implements OnInit {
  pipelineForm!: FormGroup;
  isSaving = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private pipelineService: PipelineConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pipelineForm = this.fb.group({
      pipelineKey: ['', Validators.required],
      version: [1, [Validators.required, Validators.min(1)]],
      stages: this.fb.array([]) // empty array to start
    });
  }

  get stages(): FormArray {
    return this.pipelineForm.get('stages') as FormArray;
  }

  addStage(): void {
    this.stages.push(this.fb.group({
      stageName: ['', Validators.required]
    }));
  }

  removeStage(index: number): void {
    this.stages.removeAt(index);
  }

  save(): void {
    if (this.pipelineForm.invalid) {
      this.pipelineForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const dto: PipelineConfig = this.pipelineForm.value;

    this.pipelineService.create(dto).subscribe({
      next: (id: string) => {
        this.isSaving = false;
        // Navigate back to list or detail page after create
        this.router.navigate(['/management/settings/pipeline-configs']);
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = 'Failed to create pipeline config.';
        console.error(err);
      }
    });
  }
}
