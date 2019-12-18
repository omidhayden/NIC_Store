import { AlertifyService } from './../../../../../../src/app/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { CartService } from './../../_services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { environment } from 'src/environments/environment';
import { addToCart } from 'projects/client/src/_models/addToCart';



@Component({
  selector: 'all-products-section',
  templateUrl: './all-products-section.component.html',
  styleUrls: ['./all-products-section.component.css']
})
export class AllProductsSectionComponent implements OnInit {
  products : any;
  addToCartModel:addToCart;
  id : string;
  imageDir = environment.imageDir;
  constructor(private productService: ProductService, private cartService: CartService, private authService: AuthService, private alertify: AlertifyService) { }

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

  addToCartButton(pId){
    // console.log(name);
      this.addToCartModel= {
        productId : pId
      }
    // console.log(this.addToCartModel.productName);
    if(this.authService.loggedIn()){
      console.log(this.authService.decodedToken.unique_name);
      this.id = this.authService.decodedToken.nameid;
      this.cartService.addToCart(this.id, this.addToCartModel).subscribe(()=>{
        return this.alertify.success("Your product added successfully")
      }, () =>{
        return this.alertify.error("There is something wrong with our server. We are trying to fix it as soon as possible. Sorry for the inconvinience.");
      });

    }else{
      this.alertify.warning("We are trying to implement add to cart for annonymous users")
    }
  }
      
  

}
