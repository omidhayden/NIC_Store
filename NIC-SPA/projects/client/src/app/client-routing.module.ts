import { GetCartResolver } from './_resolvers/get-cart-resolver';
import { ShoppingCartComponent } from './cart/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'products', component:ProductsComponent},
  {path: 'cart', 
  component: ShoppingCartComponent,
  resolve:{cartList: GetCartResolver}
},
  {path:'aboutus', component: AboutusComponent},
  {path: '**', redirectTo: 'home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
