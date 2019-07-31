import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from'rxjs/operators';
import { Photo } from '../_models/photo';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
 
  constructor(private http: HttpClient) { }
  baseUrl: 'http://localhost:5000/api/';


    
  getPhotos(productId){
    this.http.get(this.baseUrl + 'products/'+ productId + '/photos').subscribe((r)=>{
      return r;
    })
  }

  setMainPhoto(productId: number, id: number)
  {
    return this.http.patch('http://localhost:5000/api/' + 'products/' + productId + '/photos/' + id + '/setMain',{});
  }

  
  }

