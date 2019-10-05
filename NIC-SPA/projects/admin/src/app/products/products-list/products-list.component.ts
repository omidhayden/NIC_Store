import { UniqueValue } from './../../_pipes/unique-value.pipe';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { AlertifyService } from 'src/app/alertify.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [UniqueValue]
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatSort,  {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  products : [];
  displayedColProducts: string[] = ['id', 'name', 'details', 'price', 'createdBy', 'category', 'createdDate', 'actions'];
  dataSource=new  MatTableDataSource();
  
  constructor(private uniqueValue: UniqueValue,private productService:ProductService, private alertify: AlertifyService, private router: Router) { }

  
    ngOnInit() {
      
      
      this.Getproducts();
    //   setTimeout(() => { 
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //  });
    }

    ngAfterViewInit() {
      
      }
    Getproducts(){
      this.productService.getProducts().subscribe((products:[])=> {
       this.products = products;
       this.dataSource = new MatTableDataSource(this.products)
       console.log(products);
       setTimeout(() => { 
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.sort);


     });

     
      
      }, (e) =>{
        this.alertify.error(e);
      })
    }
    sortingDataAccessor(item, property) {
      if (property.includes('.')) {
        return property.split('.')
          .reduce((object, key) => object[key], item);
      }
      return item[property];
    }
    Delete(id: number){
      this.alertify.confirm("Are you sure you want to delete this product?", ()=>{
        this.productService.deleteProduct(id).subscribe(()=>{
          //ngOnInit will refresh the component
          this.ngOnInit();
          this.alertify.success("Product deleted successfully!");
          
        },(e)=>{
          this.alertify.error(e);
          
          this.router.navigate(['admin/products']);
        });
      });
    }
    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

}
