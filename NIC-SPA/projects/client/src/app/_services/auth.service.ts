import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken  : any;
  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:5000/api/auth/';
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;

          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            
          }

        })
      )
  }



  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }


  loggedIn(){
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token))
    {
      return false;
    }
   
    this.decodedToken = this.jwtHelper.decodeToken(token);
    return true;
  }
  roleMatch(allawedRoles): boolean{
    
    let isMatch = false;
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token)) return isMatch;
    this.decodedToken = this.jwtHelper.decodeToken(token);
    
    
    if(this.decodedToken == null) return isMatch;
    const userRoles = this.decodedToken.role as Array<string>;
   
    allawedRoles.forEach(element => {
      if(userRoles.includes(element))
      {
        isMatch = true;
        return;
      }
    });
    return isMatch;

  }

}
