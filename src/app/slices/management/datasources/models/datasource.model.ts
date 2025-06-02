
export interface DataSource {
  id: string;
  name: string;
  target: string;
  domainId: string;
  platformId: string;
  limit: number;
}

export interface AddDataSourceCommand {
  name: string;
  target: string;
  domainId: string;
  platformId: string;
}

export interface UpdateDataSourceCommand {
  id: string;
  name: string;
  target: string;
  domainId: string;
  platformId: string;
}
