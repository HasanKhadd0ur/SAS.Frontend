import { Component, HostListener, OnInit } from '@angular/core';
import { NamedEntity } from '../models/event.model';
import { NamedEntityService } from '../services/named-entity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-named-entity',
  standalone: false,
  templateUrl: './named-entity.component.html',
  styleUrl: './named-entity.component.css'
})
export class NamedEntityComponent implements OnInit {
  namedEntities: NamedEntity[] = [];
  pageNumber = 1;
  pageSize = 20;
  isLoading = false;
  allLoaded = false;


  constructor(
    private namedEntityService: NamedEntityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMoreEntities();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !this.isLoading && !this.allLoaded) {
      this.loadMoreEntities();
    }
  }

  loadMoreEntities(): void {
    this.isLoading = true;
    this.namedEntityService.getAll(this.pageNumber, this.pageSize).subscribe({
      next: (entities) => {
        if (entities.length < this.pageSize) {
          this.allLoaded = true;
        }
        this.namedEntities.push(...entities);
        this.pageNumber++;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
  
  goToEvents(entityId: string): void {
    this.router.navigate(['/events/by-named-entity', entityId]);
  }
}
