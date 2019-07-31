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
  product: any={}
  productId: number;
  showEdit: boolean= false
  constructor(
    private productService: ProductService, 
    private alertify: AlertifyService, 
    private router: Router,
    private route:ActivatedRoute
    ) { 
      
        route.params.subscribe(p =>{
        this.productId = +p['id'];
        if(isNaN(this.productId) || this.productId <=0){
          router.navigate(['/admin/products']);
          return;
        }
      });
        

    }

  ngOnInit() {
     this.productService.getProduct(this.productId)
    .subscribe((p)=>{
      
      this.product = p;
      
    }, err =>{
      if(err.status == 204){
        this.router.navigate(['/admin/products']);
        return;
      }
    });




    
  }
  
  toggleEdit(){
    this.showEdit = !this.showEdit
    
  }


  
  productFromEdit(p: Product): void{
    this.product = p;
    console.log(p);
  }




  




}
