import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';



import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


const providers = []
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    AboutusComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ClientRoutingModule,
    FormsModule,



    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  entryComponents:[
    LoginComponent
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class ClientSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers
    }
  }
}