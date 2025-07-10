import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PlatformsService } from '../../../platforms/services/platforms.service';
import { Platform } from '../../../platforms/models/platforms.model';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
  standalone: false
})
export class PlatformsComponent implements OnInit {
  
  pagedPlatformsSources: Platform[] = [];
  platforms: Platform[] = [];
  batchSize = 6;
  currentIndex = 0;


  constructor(
    private messageService: MessageService,
    private platformsService: PlatformsService,
  ) { }

  ngOnInit(): void {

    
    this.platformsService.getAll().subscribe({
      next: (platforms) => {
        this.platforms = platforms;
        this.loadMore();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load platforms' });
      }
    });
  }


  loadMore(): void {
    const next = this.platforms.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.pagedPlatformsSources.push(...next);
    this.currentIndex += this.batchSize;
  }

  reset(): void {
    this.platforms = [];
    this.currentIndex = 0;
    this.ngOnInit();
  }
}
