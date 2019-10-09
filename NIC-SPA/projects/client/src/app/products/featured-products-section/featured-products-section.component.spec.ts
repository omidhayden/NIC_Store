import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProductsSectionComponent } from './featured-products-section.component';

describe('FeaturedProductsComponent', () => {
  let component: FeaturedProductsSectionComponent;
  let fixture: ComponentFixture<FeaturedProductsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedProductsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
