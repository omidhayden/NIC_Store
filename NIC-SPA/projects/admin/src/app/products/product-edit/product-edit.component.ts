import { Product } from './../../_models/product';
import { ProductInfoComponent } from './../product-info/product-info.component';
import { AlertifyService } from 'src/app/alertify.service';
import { ProductService } from './../../_services/product.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
 @Input() productEdit: boolean; 
 @Output()  cancelToggle : EventEmitter<boolean> = new EventEmitter<boolean>();
 @Output() passProduct: EventEmitter<Product> = new EventEmitter<Product>()
 @ViewChild('editForm', {static: false}) editForm: NgForm;
 product: any;
 productId: number;
  
  
  constructor(private productService:ProductService,
    private router: Router,
    private route:ActivatedRoute,
    private alertify: AlertifyService) {

      
      route.params.subscribe(p =>{
        this.productId = +p['id'];
        if(isNaN(this.productId) || this.productId <=0){
          router.navigate(['/admin/products']);
          return;
        }
      });


     }

  ngOnInit() {
    const product = this.productService.getProduct(this.productId).subscribe((r)=>{
      this.product = r;
      
    });


    
    

  }
  cancelEdit(){
    this.productEdit = !this.productEdit;
    this.cancelToggle.emit(this.productEdit);
    this.ngOnInit();
    this.editForm.reset(this.product);
  }
  updateProduct(){ 
    this.productService.updateProduct(this.productId, this.product).subscribe(()=>{
      this.alertify.success("Changes saved successfully!")
      this.editForm.reset(this.product);
      this.ngOnInit();
      //**** With this you can update the object in your parent component****/

      this.passProduct.next(this.product);
      
      // this.router.navigateByUrl('admin/products/', {skipLocationChange: true}).then(()=>{
      //   this.router.navigate([this.productId])
      // });
      
    },(e)=>{
      this.alertify.error(e);
    });
  }

}
