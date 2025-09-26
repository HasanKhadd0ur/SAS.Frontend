import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: false,
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

  toggleFAQ(event: Event) {
    const item = (event.currentTarget as HTMLElement).parentElement;
    if (item) {
      item.classList.toggle('active');
    }
  }
  
}
