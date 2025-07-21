export interface Scraper {
  id: string;
  scraperName: string;
  hostname: string;
  ipAddress: string;
  registeredAt: string;
  isActive: boolean;
  tasksHandled: number;
}