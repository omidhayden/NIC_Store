import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from 'src/app/alertify.service';
import { ProductService } from './../_services/product.service';
import { Product } from './../_models/product';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
  
export class ProductsListResolver implements Resolve<Product[]> {


      
  pageNumber :number = 1;
  pageSize: number =  10;
  
    constructor(
        private productsService: ProductService, 
        private router: Router, 
        private alertify: AlertifyService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<Product[]>

    {
        return this.productsService.getProducts(null,null,null, this.pageNumber,this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }

    

}