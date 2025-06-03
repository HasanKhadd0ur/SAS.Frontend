export interface ScrapingDomain {
  id: string;
  normalisedName: string;
  name: string;
  description?: string;
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
