import { Product } from '../_models/product';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  UrlBase: 'http://localhost:5000';
  
  constructor(private http: HttpClient) { }
  
  getProducts(){
    return this.http.get('http://localhost:5000/api/product/all');
  }

  getProduct(id: number){
    return this.http.get('http://localhost:5000/api/product/' +id);
  }


  addProduct(product: Product){
    return this.http.post('http://localhost:5000/api/product/add', product);
  }
  deleteProduct(id: number)
  {
    return this.http.delete('http://localhost:5000/api/product/'+ id);
  }
}
