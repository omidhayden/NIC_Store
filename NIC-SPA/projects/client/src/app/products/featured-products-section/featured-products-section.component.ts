import { environment } from './../../../../../../src/environments/environment';
import { ProductService } from '../../_services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'featured-products-section',
  templateUrl: './featured-products-section.component.html',
  styleUrls: ['./featured-products-section.component.css']
})
export class FeaturedProductsSectionComponent implements OnInit {
   products : any;
   imageDir = environment.imageDir;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((result)=>{
      this.products = result ;
  
      
      console.log(result);
    }, (e)=>{
      console.log(e);
    });
  }
}
