import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ScrapingDomainsService } from '../../services/scraping-domains.service';

@Component({
  selector: 'app-scraping-domain-create',
  templateUrl: './scraping-domain-create.component.html',
  standalone: false
})
export class ScrapingDomainCreateComponent {
  @Output() created = new EventEmitter<void>();
  form: FormGroup;
  display = false;

  constructor(
    private fb: FormBuilder,
    private service: ScrapingDomainsService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      normalisedName: ['', Validators.required],
      description: ['']
    });
  }

  show(): void {
    this.display = true;
  }

  hide(): void {
    this.display = false;
  }

  submit(): void {
    if (this.form.invalid) return;
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.hide();
        this.created.emit();
      },
      error: (err) => {
        console.error('Error creating domain', err);
      }
    });
  }
}
