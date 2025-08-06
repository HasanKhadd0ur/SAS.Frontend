import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService, PolicyRule } from '../../services/policy.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy.component.html',
  standalone:false,
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  rule!: PolicyRule;
  loading = false;
  error: string | null = null;

  constructor(
    private policyService: PolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const ruleName = this.route.snapshot.paramMap.get('name');
    if (!ruleName) {
      this.error = 'No rule name specified.';
      this.loading = false;
      return;
    }

    this.policyService.getRule(ruleName).subscribe({
      next: (rule) => {
        this.rule = rule;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Failed to load rule: ${err.error?.error || err.message}`;
        this.loading = false;
      }
    });
  }
  goToEditPolicy(){
    this.router.navigate(['/detection/policy']);  // Redirect back to list or wherever you want
      
  }
  onUpdateRule(): void {
    if (!this.rule) return;

    this.policyService.updateRule(this.rule.name, this.rule.value).subscribe({
      next: (updated) => {
 
         this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Policy rule updated successfully',
      });
      this.router.navigate(['/detection/policy']);  // Redirect back to list or wherever you want
        
    },
    error: (err) => {
      this.loading = false;
      this.error = 'Failed to update rule.';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: this.error,
      });
    }
  });
 }
}
