import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <div class="p-4">
      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
        <div class="field">
          <label for="name" class="font-medium text-sm block mb-1">Name</label>
          <input
            id="name"
            type="text"
            pInputText
            formControlName="name"
            class="w-full"
            placeholder="Enter topic name"
          />
        </div>

        <div class="field">
          <label for="iconUrl" class="font-medium text-sm block mb-1">Icon URL</label>
          <input
            id="iconUrl"
            type="text"
            pInputText
            formControlName="iconUrl"
            class="w-full"
            placeholder="Enter icon URL"
          />
        </div>

        <div class="field">
          <label for="description" class="font-medium text-sm block mb-1">Description</label>
          <textarea
            id="description"
            pInputTextarea
            rows="4"
            formControlName="description"
            class="w-full"
            placeholder="Short description..."
          ></textarea>
        </div>

        <div class="flex justify-end gap-2 pt-3">
          <button
            type="button"
            pButton
            label="Cancel"
            class="p-button-outlined p-button-secondary"
            (click)="cancel()"
          ></button>
          <button
            type="submit"
            pButton
            label="Save"
            [disabled]="form.invalid"
            class="p-button-primary"
          ></button>
        </div>
      </form>
    </div>
  `,
  standalone: false,
})
export class TopicFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    const topic = config.data?.topic;
    this.form = this.fb.group({
      name: [topic?.name || '', Validators.required],
      iconUrl: [topic?.iconUrl || ''],
      description: [topic?.description || ''],
    });
  }

  submit() {
    if (this.form.valid) {
      this.ref.close(this.form.value);
    }
  }

  cancel() {
    this.ref.close(null);
  }
}
