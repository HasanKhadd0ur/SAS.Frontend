import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicEventsComponent } from './topic-events.component';

describe('TopicEventsComponent', () => {
  let component: TopicEventsComponent;
  let fixture: ComponentFixture<TopicEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
