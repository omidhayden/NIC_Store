import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { AlertifyService } from './../../../../src/app/alertify.service';
import { ProductService } from './_services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatInputModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProductsListComponent } from './products/products-list/products-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductPhotoComponent } from './products/product-photo/product-photo.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FileUploadModule } from 'ng2-file-upload';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { SubSelectComponent } from './products/sub-select/sub-select.component';
import { CategoryService } from './_services/category.service';
import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
const providers = [ProductService, CategoryService]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProductsListComponent,
    ProductAddComponent,
    ProductInfoComponent,
    ProductPhotoComponent,
    ProductEditComponent,
    SubSelectComponent

  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatInputModule,
    BrowserModule,
    AdminRoutingModule,
    MatButtonModule,
    MatSlideToggleModule,
    FileUploadModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTreeModule,
    MatListModule

  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class AdminSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers
    }
  }
}
