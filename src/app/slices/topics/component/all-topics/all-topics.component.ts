import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { Topic } from 'src/app/slices/events/models/topic.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-list',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css'],
  standalone:false
})
export class AllTopicsComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private topicService: TopicService,private router: Router) {}

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(topics => {
        this.topics = topics.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onViewTopic(topic: Topic): void {
    this.router.navigate(['/events/topic-events'], { queryParams: { name: topic.name } });  
  }
}

