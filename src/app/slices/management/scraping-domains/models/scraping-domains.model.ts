import { DataSource } from "../../datasources/models/datasource.model";

export interface ScrapingDomain {
  id: string;
  normalisedName: string;
  name: string;
  description?: string;
  dataSources:DataSource[]
}

export interface CreateScrapingDomainCommand {
  normalisedName: string;
  name: string;
  description?: string;
}

export interface UpdateScrapingDomainCommand {
  id: string;
  normalisedName: string;
  name: string;
  description?: string;
}
