
import { Observable } from 'rxjs';
import { PaginatedResult } from './../_models/pagination';
import { Product } from './../_models/product';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  UrlBase: 'http://localhost:5000';
  ImageUrl: 'http://localhost:5000/uploads/'
   
  constructor(private http: HttpClient) { }
  
  getProducts (sort?, dir? ,name? ,page? , itemsPerPage?):Observable<any>{
    var paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();
    let params = new HttpParams();
    
    if(name != null){
      params = params.append('name', name);

    } 
  

    if(sort != null){
      params = params.append('sort', sort);
      params = params.append('dir', dir);
      
    }


    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);

    }
    return this.http.get('http://localhost:5000/api/product/all', { observe: 'response' , params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination') != null)
        {
          
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    )
  }

  getProduct(id: number){
     return this.http.get<Product[]>('http://localhost:5000/api/product/' +id)
     
     
  }
  updateProduct(productId:number, product: any){
    return this.http.put("http://localhost:5000/api/product/" + productId, product)
    .toPromise()
    .then((result)=>{
      return result;
    })
    
  }


  addProduct(product: any){
     return this.http.post('http://localhost:5000/api/product/add', product);
    
  }
  deleteProduct(id: number)
  {
    return this.http.delete('http://localhost:5000/api/product/'+ id);
  }
}
