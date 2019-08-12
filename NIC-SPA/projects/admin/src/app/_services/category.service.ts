import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  UrlBase= 'http://localhost:5000/api/category/';
  

  getSubs(){
   return this.http.get(this.UrlBase + 'subs/all')
   .toPromise()
     .then(data => {
       return data;
     })
  }

}
