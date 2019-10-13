import { Photo } from './../../_models/photo';
import { AlertifyService } from './../../../../../../src/app/alertify.service';
import { ProductService } from './../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  product: any=[]
  productId: number;
  showEdit: boolean= false
  constructor(
    private productService: ProductService, 
    private alertify: AlertifyService, 
    private router: Router,
    private route:ActivatedRoute
    ) { 
      
      


        

    }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.product = data['product']
    });

  }
  
  toggleEdit(){
    this.showEdit = !this.showEdit
    
    
  }


  
  productFromEdit(p: Product): void{
    console.log(p);
    this.product = p;
    
  }




  




}
