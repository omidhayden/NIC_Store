import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { AlertifyService } from 'src/app/alertify.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products : Product[];

  constructor(private productService:ProductService, private alertify: AlertifyService, private router: Router) { }

  
    ngOnInit() {
      this.Getproducts();
    }
    Getproducts(){
      this.productService.getProducts().subscribe((products:Product[])=> {
       this.products = products;
      }, (e) =>{
        this.alertify.error("Failed to load products!");
      })
    }
    Delete(id: number){
      this.alertify.confirm("Are you sure you want to delete this product?", ()=>{
        this.productService.deleteProduct(id).subscribe(()=>{
          //ngOnInit will refresh the component
          this.ngOnInit();
          this.alertify.success("Product deleted successfully!");
          
        },(e)=>{
          this.alertify.error("Can't delete product");
          
          this.router.navigate(['admin/products']);
        });
      });
    }

}
