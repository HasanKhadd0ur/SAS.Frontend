import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrapersRoutingModule } from './scrapers-routing.module';
import { ScrapersListComponent } from './components/scrapers-list/scrapers-list.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    ScrapersListComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    TooltipModule,
    ScrapersRoutingModule
  ]
})
export class ScrapersModule { }
