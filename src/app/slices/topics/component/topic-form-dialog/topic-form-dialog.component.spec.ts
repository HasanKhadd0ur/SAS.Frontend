import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicFormDialogComponent } from './topic-form-dialog.component';

describe('TopicFormDialogComponent', () => {
  let component: TopicFormDialogComponent;
  let fixture: ComponentFixture<TopicFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
