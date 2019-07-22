import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundActionComponent } from './not-found-action/not-found-action.component';


const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path:'admin', redirectTo:'admin/dashboard', pathMatch:'full' },
  {path:'admin/dashboard', component: DashboardComponent},
  {path:'admin/products', component: ProductsComponent},
  

  
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
