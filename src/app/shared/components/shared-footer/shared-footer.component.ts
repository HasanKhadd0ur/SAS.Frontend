import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/service';

@Component({
  selector: 'app-shared-footer',
  standalone: false,
  templateUrl: './shared-footer.component.html',
  styleUrl: './shared-footer.component.css'
})
export class SharedFooterComponent {

  constructor(
    public layoutService: LayoutService,
    public router: Router) {
    
  }

}
