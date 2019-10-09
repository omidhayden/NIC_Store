import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  UrlBase: 'http://localhost:5000';
  ImageUrl: 'http://localhost:5000/uploads/';
  constructor(private http: HttpClient) { }




  getProducts(){
    return this.http.get('http://localhost:5000/api/product/all');
  }
}
