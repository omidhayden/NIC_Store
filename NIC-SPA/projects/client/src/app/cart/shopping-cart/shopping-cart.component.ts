import { AuthService } from './../../_services/auth.service';
import { CartService } from './../../_services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
    
})

export class ShoppingCartComponent implements OnInit {
  id: Number;
  cartList: any[];
  constructor(private cartService:CartService, private authService:AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.cartList = data['cartList'];
      console.log(this.cartList);
    })
  }
  // getCart(){
  //   if(this.authService.loggedIn()){
  //     this.id = this.authService.decodedToken.nameid;
  //     this.cartService.getCart(this.id).subscribe(data => {
  //       this.cartList = data['cartList'];
  //       console.log(this.cartList);
  //     })
  //   }
    
  // }


}
