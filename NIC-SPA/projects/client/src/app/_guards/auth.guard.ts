import { AlertifyService } from 'src/app/alertify.service';
import { Router, ActivatedRouteSnapshot, CanLoad, Route } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( 
    private authService:AuthService,
    private router: Router,
    private alertify: AlertifyService
    )
    {

    }
  canActivate(next: ActivatedRouteSnapshot) : boolean
    {
      const roles = next.data['roles'] as Array<string>;
      if(roles) 
      {
        const match = this.authService.roleMatch(roles);
        if(match)
      {
        return true;

      }else {
        this.router.navigate(['/home']);
        this.alertify.error('You do not have permission to access this area.');
      }
      }

      if(this.authService.loggedIn())
      {
        return true;
      }
    this.alertify.error('This route is protected!');
    this.router.navigate(['/home']);
    return false;
  }
  
    


  

  
}

