import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundActionComponent } from './not-found-action.component';

describe('NotFoundActionComponent', () => {
  let component: NotFoundActionComponent;
  let fixture: ComponentFixture<NotFoundActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
