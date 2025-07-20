import { Component, OnInit } from '@angular/core';
import { Scraper } from '../../models/scraper.model';
import { ScraperService } from '../../services/scrapers.service';

@Component({
  selector: 'app-scrapers-list',
  templateUrl: './scrapers-list.component.html',
  standalone:false,
  styleUrls: ['./scrapers-list.component.css']

})
export class ScrapersListComponent implements OnInit {
  allScrapers: Scraper[] = [];
  pagedScrapers: Scraper[] = [];
  pageSize = 5;
  pageIndex = 0;

  constructor(private scraperService: ScraperService) {}

  ngOnInit(): void {
    this.scraperService.getScrapers().subscribe(data => {
      this.allScrapers = data;
      this.loadMore();
    });
  }

  loadMore(): void {
    const next = this.allScrapers.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
    this.pagedScrapers = [...this.pagedScrapers, ...next];
    this.pageIndex++;
  }

  onView(scraper: Scraper) {
    console.log('Viewing', scraper);
  }

  onEdit(scraper: Scraper) {
    console.log('Editing', scraper);
  }

  confirmDelete(scraper: Scraper) {
    console.log('Deleting', scraper);
  }
}
