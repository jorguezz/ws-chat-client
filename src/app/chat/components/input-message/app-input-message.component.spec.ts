import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputMessageComponent } from './app-input-message.component';

describe('AppInputMessageComponent', () => {
  let component: AppInputMessageComponent;
  let fixture: ComponentFixture<AppInputMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInputMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInputMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
