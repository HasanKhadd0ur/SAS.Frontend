import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LeafletMapComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    HttpClientModule 
  ],
  exports:[LeafletMapComponent]
})
export class MapModule { }
