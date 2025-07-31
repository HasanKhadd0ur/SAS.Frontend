import { Component, OnInit } from '@angular/core';
import { LocationConfigService } from '../../services/location-config.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-location-config',
  templateUrl: './location-config.component.html',
  standalone:false,
  styleUrl: './location-config.component.css',
})
export class LocationConfigComponent implements OnInit {
  recognizers: string[] = [];
  resolvers: string[] = [];

  currentRecognizer: string = '';
  currentResolver: string = '';

  selectedRecognizer: string = '';
  selectedResolver: string = '';

  showForm = false;

  constructor(
    private locationConfigService: LocationConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.locationConfigService.getAvailableServices().subscribe(res => {
      this.recognizers = res.recognizers;
      this.resolvers = res.resolvers;
    });

    this.locationConfigService.getCurrentConfig().subscribe(res => {
      this.currentRecognizer = res.recognizer_key;
      this.currentResolver = res.resolver_key;

      // Set defaults for dropdowns
      this.selectedRecognizer = res.recognizer_key;
      this.selectedResolver = res.resolver_key;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  saveConfig() {
    this.locationConfigService.updateConfig({
      recognizer_key: this.selectedRecognizer,
      resolver_key: this.selectedResolver
    }).subscribe(_ => {
      this.currentRecognizer = this.selectedRecognizer;
      this.currentResolver = this.selectedResolver;
      this.showForm = false;
      
      this.messageService.add({
        severity: 'success',
        summary: 'Configuration Updated',
        detail: 'Recognizer and Resolver have been updated successfully.'
      });
      
    });
  }
}