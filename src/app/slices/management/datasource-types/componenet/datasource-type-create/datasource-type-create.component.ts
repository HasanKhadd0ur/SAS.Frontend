import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataSourceTypeService } from '../../services/datasource-types.service';

@Component({
  selector: 'app-datasource-type-create',
  standalone: false,
  templateUrl: './datasource-type-create.component.html',
  styleUrl: './datasource-type-create.component.css'
})
export class DatasourceTypeCreateComponent {
 form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DataSourceTypeService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.service.add(this.form.value).subscribe({
        next: res => alert('Added successfully'),
        error: err => alert('Failed to add')
      });
    }
  }
}