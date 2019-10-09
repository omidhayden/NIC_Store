import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'all-products-section',
  templateUrl: './all-products-section.component.html',
  styleUrls: ['./all-products-section.component.css']
})
export class AllProductsSectionComponent implements OnInit {
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
