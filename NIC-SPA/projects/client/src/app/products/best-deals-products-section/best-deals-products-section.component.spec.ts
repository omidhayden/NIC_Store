import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDealsProductsSectionComponent } from './best-deals-products-section.component';

describe('BestDealsProductsSectionComponent', () => {
  let component: BestDealsProductsSectionComponent;
  let fixture: ComponentFixture<BestDealsProductsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestDealsProductsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestDealsProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
