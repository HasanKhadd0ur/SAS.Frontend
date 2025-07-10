import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataSourceType } from '../../models/datasource-type.model';
import { DataSourceTypeService } from '../../services/datasource-types.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-datasource-types',
  templateUrl: './datasource-types.component.html',
  styleUrls: ['./datasource-types.component.css'],
  standalone: false,
  providers: [MessageService]
})
export class DataSourceTypesComponent implements OnInit {
  types: DataSourceType[] = [];
  form: FormGroup;
  showCreateForm = false;

  constructor(
    private service: DataSourceTypeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes(): void {
    this.service.getAll().subscribe({
      next: res => this.types = res,
      error: () => this.messageService.add({severity:'error', summary:'Error', detail:'Failed to load types'})
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.service.add(this.form.value).subscribe({
        next: () => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Data source type added'});
          this.showCreateForm = false;
          this.form.reset();
          this.loadTypes();
        },
        error: () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add data source type'});
        }
      });
    }
  }
}
