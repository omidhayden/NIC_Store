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
  getCats(){
     return this.http.get(this.UrlBase + 'all')
    .toPromise()
    .then(data =>{
      return data
    });
  }
  getSubsWithCat(id){
    return this.http.get(this.UrlBase+ id+ "/subs")
    .toPromise()
    .then(data =>{ 
      return data
    })
  }

  addCategoriesWithsubs(catWithSubs){
    return this.http.post(this.UrlBase+ "add", catWithSubs)
    .toPromise()
    .then((result)=>{
      return result;
    }, (e)=>{
      console.log(e);
    })
  }

  addSubsForCategory(id, subs){
    return this.http.post(this.UrlBase + id + "/add" , subs)
    .toPromise()
    .then((result)=> {
      return result;

    }, (e)=>{
      console.log(e);
    })
    

  
  }



  deleteCat(id){
    return this.http.delete(this.UrlBase + id)
    .toPromise()
    .then(()=>{
      console.log("Success")
    }, (e)=>{
      console.log(e);
    })
  }

  deleteSubCat(id){
    return this.http.delete(this.UrlBase + "sub/" + id)
    .toPromise()
    .then(()=>{
      
      console.log("Success")

    }, (e)=>{
      console.log(e);
    })
  }
}
