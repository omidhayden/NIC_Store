import { AuthGuard } from './../../../client/src/app/_guards/auth.guard';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';





const routes: Routes = [
  
  {
  path:'admin', 
  redirectTo:'admin/dashboard', 
  pathMatch:'full'
  },
  {
  path: 'admin',
  canActivate :[AuthGuard],
  data: { roles: ['Admin', 'Inventory Manager']},
  children: 
    [    
      
      {
        path:'dashboard', 
        component: DashboardComponent,
      
      },
      {
        path:'products', 
        component: ProductsListComponent
        
      },
      {
        path:'products/add',
        component: ProductAddComponent,
        pathMatch: 'full',
        canActivate :[AuthGuard],
        data: { roles: ['Admin']},  
       
      },
      

      {
        path:'products/:id',
        component:ProductInfoComponent
      },
      {
        path:'categories',
        component:CategoryListComponent
      },
    ]
  },

  ];
  

  

  
  

  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
