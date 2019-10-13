import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../../../../../src/app/alertify.service';
import { ProductService } from './../_services/product.service';
import { Product } from './../_models/product';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()

export class ProductDetailResolver implements Resolve<Product> {
    constructor(
        private productsService: ProductService, 
        private router: Router, 
        private alertify: AlertifyService){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Product>{
        return this.productsService.getProduct(route.params['id']).pipe(
            catchError(error=>{
                this.alertify.error('Problem retrieving data');
                // this.router.navigate(['admin/products']);
                return of(null);
            })
        )
    }




}