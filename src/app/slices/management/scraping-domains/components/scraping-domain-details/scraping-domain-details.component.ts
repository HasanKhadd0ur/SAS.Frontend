import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrapingDomain } from '../../models/scraping-domains.model';
import { ScrapingDomainsService } from '../../services/scraping-domains.service';

@Component({
  selector: 'app-scraping-domain-details',
  templateUrl: './scraping-domain-details.component.html',
  standalone:false
})
export class ScrapingDomainDetailsComponent implements OnInit {
  domain?: ScrapingDomain;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private service: ScrapingDomainsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDomain(id);
    }
  }

  loadDomain(id: string): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (data) => {
        this.domain = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading domain', err);
        this.loading = false;
      }
    });
  }
}
