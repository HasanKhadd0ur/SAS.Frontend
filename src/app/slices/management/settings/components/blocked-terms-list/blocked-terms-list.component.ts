import { Component, OnInit } from '@angular/core';
import { BlockedTermsService } from '../../services/blocked-terms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockedTermDto, UpdateBlockedTermDto, CreateBlockedTermDto } from '../../models/blocked-terms.model';

@Component({
  selector: 'app-blocked-terms-list',
  templateUrl: './blocked-terms-list.component.html',
  styleUrls: ['./blocked-terms-list.component.css'],
  standalone: false,
})
export class BlockedTermsListComponent implements OnInit {
  blockedTerms: BlockedTermDto[] = [];
  loading = false;
  error: string | null = null;

  form!: FormGroup;
  isEditing = false;
  currentEditingId: string | null = null;

  // Control view: true = show form, false = show list
  showForm = false;

  constructor(
    private blockedTermsService: BlockedTermsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadBlockedTerms();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      term: ['', Validators.required],
    });
  }

  loadBlockedTerms() {
    this.loading = true;
    this.blockedTermsService.getAll().subscribe({
      next: (terms) => {
        this.blockedTerms = terms;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load blocked terms';
        this.loading = false;
      },
    });
  }

  // Show form to create new term
  onCreateNew() {
    this.isEditing = false;
    this.currentEditingId = null;
    this.form.reset();
    this.error = null;
    this.showForm = true;
  }

  // Show form to edit existing term
  onEdit(term: BlockedTermDto) {
    this.isEditing = true;
    this.currentEditingId = term.id;
    this.form.patchValue({ term: term.term });
    this.error = null;
    this.showForm = true;
  }

  // Cancel form and go back to list
  onCancel() {
    this.showForm = false;
    this.error = null;
  }

  // Submit form (create or update)
  onSubmit() {
    if (this.form.invalid) return;

    const termValue = this.form.value.term.trim();
    if (!termValue) return;

    if (this.isEditing && this.currentEditingId) {
      // Update
      const dto: UpdateBlockedTermDto = {
        id: this.currentEditingId,
        term: termValue,
      };
      this.blockedTermsService.update(this.currentEditingId, dto).subscribe({
        next: () => {
          this.loadBlockedTerms();
          this.showForm = false;
        },
        error: () => (this.error = 'Failed to update the term'),
      });
    } else {
      // Create
      const dto: CreateBlockedTermDto = {
        term: termValue,
      };
      this.blockedTermsService.create(dto).subscribe({
        next: () => {
          this.loadBlockedTerms();
          this.showForm = false;
        },
        error: () => (this.error = 'Failed to create the term'),
      });
    }
  }

  // Delete directly (you can add a confirm prompt if needed)
  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this term?')) {
      this.blockedTermsService.delete(id).subscribe(() => {
        this.loadBlockedTerms();
        if (this.currentEditingId === id) {
          this.showForm = false;
        }
      });
    }
  }
}
