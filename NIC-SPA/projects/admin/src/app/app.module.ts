



import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundActionComponent } from './not-found-action/not-found-action.component';


const providers = []
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProductsComponent,
    NotFoundActionComponent
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule

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
