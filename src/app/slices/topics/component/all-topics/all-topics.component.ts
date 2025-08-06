import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { Topic } from 'src/app/slices/events/models/topic.model';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TopicFormDialogComponent } from '../topic-form-dialog/topic-form-dialog.component';

@Component({
  selector: 'app-topic-list',
  templateUrl: './all-topics.component.html',
  standalone:false,
  styleUrls: ['./all-topics.component.css'],
})
export class AllTopicsComponent implements OnInit {
  topics: Topic[] = [];

  constructor(
    private topicService: TopicService,
    private router: Router,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.topicService.getTopics().subscribe(topics => {
      this.topics = topics.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onViewTopic(topic: Topic): void {
    this.router.navigate(['/events/topic-events'], { queryParams: { name: topic.name } });
  }

  onCreateTopic(): void {
    const ref = this.dialogService.open(TopicFormDialogComponent, {
      header: 'Create Topic',
      width: '400px',
    });

    ref.onClose.subscribe((formData) => {
      if (formData) {
        this.topicService.createTopic(formData).subscribe(() => {
          this.loadTopics();
        });
      }
    });
  }


  onEditTopic(topic: Topic): void {
    const ref = this.dialogService.open(TopicFormDialogComponent, {
      header: 'Edit Topic',
      width: '400px',
      data: { topic },
    });

    ref.onClose.subscribe((formData) => {
      if (formData) {
        this.topicService.updateTopic(topic.id, formData).subscribe(() => {
          this.loadTopics();
        });
      }
    });
  }

  onDeleteTopic(topic: Topic): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${topic.name}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.topicService.deleteTopic(topic.id).subscribe(() => {
          this.loadTopics();
        });
      }
    });
  }

}
