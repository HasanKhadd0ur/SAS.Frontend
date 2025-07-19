export interface PipelineStage {
  id?: string;
  stageName: string;
  sortOrder: number;
  parametersJson?: string;
}

export interface PipelineConfig {
  id?: string;
  pipelineKey: string;
  version: number;
  stages: PipelineStage[];
}
