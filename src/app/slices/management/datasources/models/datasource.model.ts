import { DataSourceType } from "../../datasource-types/models/datasource-type.model";

export interface DataSource {
  id: string;
  name: string;
  target: string;
  domainId: string;
  platformId: string;
  limit: number;
  dataSourceType: DataSourceType;
  lastTimeScraped: Date;
}

export interface AddDataSourceCommand {
  name: string;
  target: string;
  domainId: string;
  platformId: string;
  dataSourceTypeId:string;
}

export interface UpdateDataSourceCommand {
  id: string;
  name: string;
  target: string;
  domainId: string;
  platformId: string;
  dataSourceTypeId:string;
}
