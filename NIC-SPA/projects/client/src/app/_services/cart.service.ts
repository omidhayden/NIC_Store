import { map } from 'rxjs/operators';
import { quantityToModify } from './../../_models/quantityToModify';
import { addToCart } from './../../_models/addToCart';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cartItems } from '../../_models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  UrlBase= 'http://localhost:5000/api/users/';
  addToCartModel: addToCart;
  CartQuantity: number;
  cartItem: cartItems[];
constructor(private http: HttpClient) { }


  addToCart(id, addToCartModel){
    return this.http.post(this.UrlBase + id + "/cart/add", addToCartModel);
  }

  getCart(id){
    return this.http.get(this.UrlBase + id + "/cart");
  }

  changeQuantity(id, modify){
    
 
    return this.http.post(this.UrlBase + id + "/cart/quantity", modify);

    
  }



}
