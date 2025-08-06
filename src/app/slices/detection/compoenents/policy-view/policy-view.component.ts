import { Component, OnInit } from '@angular/core';
import { PolicyRule, PolicyService } from '../../services/policy.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-policy-view',
  standalone:false,
  templateUrl: './policy-view.component.html',
  providers: [MessageService]
})
export class PolicyViewComponent implements OnInit {
  rules:PolicyRule[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadRules();
  }

  loadRules() {
    this.loading = true;
    this.policyService.getAllRules().subscribe({
      next: (data) => {
        this.rules = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load policy rules.';
        this.loading = false;
      }
    });
  }

  editRule(ruleName: string) {
    this.router.navigate(['/detection/policy/edit', ruleName]);
  }

  toggleRule(rule: any) {
    this.policyService.toggleRule(rule.name, rule.enabled).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Rule "${rule.name}" ${rule.enabled ? 'enabled' : 'disabled'}.`
        });
      },
      error: () => {
        rule.enabled = !rule.enabled; // Revert
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to update rule "${rule.name}".`
        });
      }
    });
  }
}
