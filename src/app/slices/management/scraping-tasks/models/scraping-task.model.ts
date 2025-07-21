import { DataSource } from "../../datasources/models/datasource.model";
import { ScrapingDomain } from "../../scraping-domains/models/scraping-domains.model";

export interface ScrapingTask {
  id: string;
  publishedAt: Date;
  completedAt?: Date;
  scraperId?: string;
  domainId: string;
  scrapingExecutor?: {
    scraperName: string;
    hostname: string;
    ipAddress: string;
  };
  domain?: ScrapingDomain;
  dataSources: DataSource[]
}
