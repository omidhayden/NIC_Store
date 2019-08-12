import { CategoryService } from "./../../_services/category.service";
import { Product } from "./../../_models/product";
import { ProductInfoComponent } from "./../product-info/product-info.component";
import { AlertifyService } from "src/app/alertify.service";
import { ProductService } from "./../../_services/product.service";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { compare } from "@rxweb/reactive-form-validators";
import { Observable } from "rxjs";

@Component({
  selector: "product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"]
})
export class ProductEditComponent implements OnInit {
  @Input() productEdit: boolean;
  @Output() cancelToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() passProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @ViewChild("editForm", { static: false }) editForm: NgForm;

  @ViewChild("search", { static: false }) searchTextBox: ElementRef;

  product: any = [];
  productId: number;
  subsId: any = [];
  data: FormGroup;

  constructor(
    private productService: ProductService,
    private subService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {
    route.params.subscribe(p => {
      this.productId = +p["id"];
      if (isNaN(this.productId) || this.productId <= 0) {
        router.navigate(["/admin/products"]);
        return;
      }
    });
  }

  ngOnInit() {
    this.productService.getProduct(this.productId).subscribe(r => {
      this.product = r;
      this.data = this.fb.group({
        name: new FormControl(this.product["name"], []),
        details: new FormControl(this.product["details"], []),
        price: new FormControl(this.product["price"], [])
      });
    });

    console.log(this.product);
  }

  subsForReturn(r) {
    if (r) {
      this.subsId = r;
    }
    console.log(this.subsId);
  }

  cancelEdit() {
    this.productEdit = !this.productEdit;
    this.cancelToggle.emit(this.productEdit);
    this.ngOnInit();
    // this.editForm.reset(this.product);
  }
  updateProduct() {
    const updatedProduct = {
      name: this.data.get("name").value,
      details: this.data.get("details").value,
      price: this.data.get("price").value,
      SubCategoryId: this.subsId
    };

    // console.log(updatedProduct);
    this.productService
      .updateProduct(this.productId, updatedProduct)

      .then(
        (Response: Product) => {
          this.alertify.success("Changes saved successfully!");

          this.passProduct.emit(Response);

          // this.router.navigateByUrl('admin/products/', {skipLocationChange: true}).then(()=>{
          //   this.router.navigate([this.productId])
          // });
        },
        e => {
          this.alertify.error("We can not update the product!");
        }
      );
  }
}
