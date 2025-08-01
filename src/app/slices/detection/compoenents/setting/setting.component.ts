import { Component, OnInit } from '@angular/core';
import { StrategyService } from '../../services/strategy.service';

@Component({
  selector: 'app-setting',
  standalone: false,
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {
  availableStrategies: string[] = [];
  currentStrategy: string | null = null;
  selectedStrategy: string | null = null;
  message: string = '';
  error: string = '';

  constructor(private strategyService: StrategyService) {}

  ngOnInit() {
    this.loadStrategies();
    this.loadCurrentStrategy();
  }

  loadStrategies() {
    this.strategyService.getAvailableStrategies().subscribe({
      next: (res) => {
        this.availableStrategies = res.available_strategies;
      },
      error: (err) => {
        this.error = 'Failed to load available strategies.';
      }
    });
  }

  loadCurrentStrategy() {
    this.strategyService.getCurrentStrategy().subscribe({
      next: (res) => {
        this.currentStrategy = res.current_strategy;
        this.selectedStrategy = this.currentStrategy;
      },
      error: (err) => {
        this.error = 'Failed to load current strategy.';
      }
    });
  }

  saveStrategy() {
    if (!this.selectedStrategy) {
      this.error = 'Please select a strategy.';
      return;
    }
    this.strategyService.setStrategy(this.selectedStrategy).subscribe({
      next: (res) => {
        this.message = res.message || 'Strategy updated successfully!';
        this.error = '';
        this.currentStrategy = this.selectedStrategy;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to update strategy.';
        this.message = '';
      }
    });
  }
}
