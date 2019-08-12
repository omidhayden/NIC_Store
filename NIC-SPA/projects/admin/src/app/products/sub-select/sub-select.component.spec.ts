import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSelectComponent } from './sub-select.component';

describe('SubSelectComponent', () => {
  let component: SubSelectComponent;
  let fixture: ComponentFixture<SubSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
