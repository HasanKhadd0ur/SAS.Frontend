import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedEntityComponent } from './named-entity.component';

describe('NamedEntityComponent', () => {
  let component: NamedEntityComponent;
  let fixture: ComponentFixture<NamedEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NamedEntityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamedEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
