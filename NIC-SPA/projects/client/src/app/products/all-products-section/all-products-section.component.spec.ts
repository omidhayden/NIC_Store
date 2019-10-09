import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsSectionComponent } from './all-products-section.component';

describe('AllProductsSectionComponent', () => {
  let component: AllProductsSectionComponent;
  let fixture: ComponentFixture<AllProductsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
