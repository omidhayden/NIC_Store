import { Product } from './../../_models/product';
import { AlertifyService } from 'src/app/alertify.service';
import { ProductService } from './../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  model: any={};

  addProd:FormGroup;
  constructor(private productService: ProductService,private alertify: AlertifyService,private router: Router) { }

  ngOnInit() {
  }

  addProduct(){
    this.productService.addProduct(this.model).subscribe(()=>{
      this.alertify.success("Product added successfully");
    }, error => {
      this.alertify.error(error);
    }, ()=>{
      this.router.navigate(['/admin/products']);
    })
  }
  cancel(){
    this.router.navigate(['/admin/products']);
  }
}
