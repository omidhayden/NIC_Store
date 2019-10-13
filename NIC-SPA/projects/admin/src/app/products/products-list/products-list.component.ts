import { Pagination } from './../../../../../client/src/_models/pagination';


import { Observable, empty } from 'rxjs';
import { UniqueValue } from './../../_pipes/unique-value.pipe';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../_models/product';
import { AlertifyService } from 'src/app/alertify.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [UniqueValue]
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatSort,  {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  products : [];
  sortedProducts : any= [];
  filteredWord: string;
  displayedColProducts: string[] = ['id', 'name', 'details', 'price', 'createdBy', 'category', 'createdDate', 'actions'];
  dataSource=new  MatTableDataSource();
  pagination :Pagination;
  constructor(private uniqueValue: UniqueValue,private productService:ProductService, private alertify: AlertifyService, private router: Router) { }
  
  pageNumber :number = 1;
  pageSize: number =  10;
  
    ngOnInit() {
      
      
      this.Getproducts();


      
      
        
    }




    Getproducts(){
        this.productService.getProducts(null ,null, null,this.pageNumber, this.pageSize).subscribe(data=> {
        this.products = data.result;
        this.pagination = data.pagination;

       this.dataSource = new MatTableDataSource(this.products)
 
    //    setTimeout(() => { 
    //     // this.dataSource.sort = this.sort;
   
     

    //  });
      }, (e) =>{
        this.alertify.error(e);
      })
    }


    pageChanged(event: any): void {
 
        this.pagination.currentPage = event.page;
        this.productService.getProducts(this.sortedProducts.active,this.sortedProducts.direction ,this.filteredWord,this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(data => {
        this.products = data.result;
        this.pagination = data.pagination;
        this.dataSource = new MatTableDataSource(this.products)
      },(e)=>{
        this.alertify.error(e);
      })

      
    }

   

    sortData(value){
      this.sortedProducts = value;
      
      //console.log(this.sortedProducts.active)
      
      this.productService.getProducts(value.active, value.direction,null,this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(data=> {
        this.products = data.result;
        this.pagination = data.pagination;

       this.dataSource = new MatTableDataSource(this.products)
        console.log(this.products);
        setTimeout(() => { 

         this.dataSource.sort = this.sort;
   
     

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
      // this.dataSource.filter = value.trim().toLocaleLowerCase();
      this.filteredWord = value.trim().toLocaleLowerCase()
        this.productService.getProducts(null,null,this.filteredWord ,this.pageNumber, this.pageSize).subscribe(data=> {
        this.products = data.result;
        this.dataSource = new MatTableDataSource(this.products);
        this.pagination = data.pagination;

       

      //  console.log(data.pagination);
       setTimeout(() => { 
        this.dataSource.sort = this.sort;
        // console.log(this.dataSource.sort);

     });
      }, (e) =>{
        this.alertify.error(e);
      })
     

    }

}
