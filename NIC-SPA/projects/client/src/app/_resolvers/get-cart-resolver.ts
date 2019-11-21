import { AlertifyService } from 'src/app/alertify.service';
import { AuthService } from './../_services/auth.service';
import { CartService } from './../_services/cart.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()


export class GetCartResolver implements Resolve<any[]>{
id: number;

    constructor(
        private router:Router, 
        private cartService: CartService, 
        private authService:AuthService,
        private alertify: AlertifyService
        ){}

        resolve(route:ActivatedRouteSnapshot): Observable<any[]>
        {
            if(this.authService.loggedIn())
            {
                this.id = this.authService.decodedToken.nameid;
                return this.cartService.getCart(this.id).pipe(
                    catchError(error =>{
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/home']);
                        return of(null);
                    })
                )
            }
            else{
                //New Implementation for annonymous user
            }
            
            
        }
}