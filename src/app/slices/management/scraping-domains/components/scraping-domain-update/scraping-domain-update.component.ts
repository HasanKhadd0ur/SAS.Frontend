import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScrapingDomain } from '../../models/scraping-domains.model';
import { ScrapingDomainsService } from '../../services/scraping-domains.service';

@Component({
  selector: 'app-scraping-domain-update',
  templateUrl: './scraping-domain-update.component.html',
  standalone:false
})
export class ScrapingDomainUpdateComponent implements OnChanges {
  @Input() domain!: ScrapingDomain;
  @Output() updated = new EventEmitter<void>();
  form!: FormGroup;
  display = false;

  constructor(
    private fb: FormBuilder,
    private service: ScrapingDomainsService
  ) {}

  ngOnChanges(): void {
    if (this.domain) {
      this.form = this.fb.group({
        id: [this.domain.id],
        name: [this.domain.name],
        normalisedName: [this.domain.normalisedName],
        description: [this.domain.description]
      });
      this.display = true;
    }
  }

  hide(): void {
    this.display = false;
  }

  submit(): void {
    if (this.form.invalid) return;

    const id = this.form.value.id;
    const updateDto = {
      id:id,
      name: this.form.value.name,
      normalisedName: this.form.value.normalisedName,
      description: this.form.value.description
    };

    this.service.update(id, updateDto).subscribe({
      next: () => {
        this.hide();
        this.updated.emit();
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }
}
