import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';





const routes: Routes = [
  
  {path:'admin', redirectTo:'admin/dashboard', pathMatch:'full' },
  {path:'admin/dashboard', component: DashboardComponent},
  {
    path:'admin/products', 
    component: ProductsListComponent,
  },
  {
    path:'admin/products/add',
    component: ProductAddComponent,
    pathMatch: 'full'
  },
  {
    path:'admin/products/:id',
    component:ProductInfoComponent
  },
  
    
  ];
  

  

  
  

  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
