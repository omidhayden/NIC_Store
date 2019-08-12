import { Product } from './../../_models/product';
import { AlertifyService } from 'src/app/alertify.service';
import { ProductService } from './../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  
  subsId: any =[]
  data : FormGroup;
  addProd:FormGroup;
  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit() {

    this.data = this.fb.group({
      name: new FormControl("", [Validators.required]),
      details: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required])
    });
  }
  subsForReturn(r) {
    if (r) {
      this.subsId = r;
    }
    console.log(this.subsId);
  }

  addProduct(){
    const product = {
      name: this.data.get("name").value,
      details: this.data.get("details").value,
      price: this.data.get("price").value,
      SubCategoryId: this.subsId
    }
    this.productService.addProduct(product).subscribe(()=>{
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
