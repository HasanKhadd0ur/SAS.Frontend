import { Component, OnInit } from '@angular/core';
import { PipelineConfigService } from '../../services/pipeline-config.service';
import { PipelineConfig } from '../../models/pipeline-config.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pipeline-configs-list',
  templateUrl: './pipeline-configs-list.component.html',
  standalone:false,
  styleUrls: ['./pipeline-configs-list.component.css']
})
export class PipelineConfigsListComponent implements OnInit {
  pipelineConfigs: PipelineConfig[] = [];
  isLoading = true;

  constructor(
    private pipelineConfigService: PipelineConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pipelineConfigService.getAll().subscribe({
      next: (result) => {
        this.pipelineConfigs = result;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to load pipeline configs.');
      }
    });
  }

  onEdit(id: string) {
    this.router.navigate(['/management/settings/pipeline/edit', id]);
  }
}
