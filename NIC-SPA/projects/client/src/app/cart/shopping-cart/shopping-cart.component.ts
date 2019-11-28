import { AlertifyService } from "./../../../../../../src/app/alertify.service";
import { cartItems } from "./../../../_models/cartItems";
import { environment } from "./../../../../../../src/environments/environment";

import { AuthService } from "./../../_services/auth.service";
import { CartService } from "./../../_services/cart.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { reduce, map } from "rxjs/operators";
import { quantityToModify } from "projects/client/src/_models/quantityToModify";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  id: Number;
  cartList: cartItems[];
  totalPrice: any = 0;
  selected = "2";
  quantityValues: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  imageDir = environment.imageDir;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.cartList = data["cartList"];
      console.log(this.cartList);
      this.updateTotalPrice();
    });
  }
  changeQuantity(newQ, pId) {
    if (this.authService.loggedIn) {
      const id = this.authService.decodedToken.nameid;
      const modify = {
        ProductId: pId,
        Quantity: newQ
      };

      this.cartService.changeQuantity(id, modify).subscribe(
        (r: cartItems[]) => {
          this.cartList = r;
          this.updateTotalPrice();
        },
        e => {
          console.log(e);
        }
      );
    }
  }
  updateTotalPrice() {
    this.totalPrice = null;
    this.cartList.forEach(element => {
      this.totalPrice += element["totalPrice"];
    });
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
