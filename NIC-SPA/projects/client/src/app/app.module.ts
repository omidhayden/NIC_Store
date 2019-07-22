import { ClientRoutingModule } from './client-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
const providers = []
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    AboutusComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ClientRoutingModule
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