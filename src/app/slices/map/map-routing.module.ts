import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

const routes: Routes = [
    { path: 'live', component: LeafletMapComponent },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
