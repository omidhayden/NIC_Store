import { AuthGuard } from './../../projects/client/src/app/_guards/auth.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ClientSharedModule } from './../../projects/client/src/app/app.module';
import { AdminSharedModule } from './../../projects/admin/src/app/app.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: '../../projects/client/src/app/app.module#ClientSharedModule'
  // },
  // {
  //   path: 'admin',
  //   loadChildren: '../../projects/admin/src/app/app.module#AdminSharedModule'
  // },
  // {
  //   path:'',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path:'**',
  //   component:NotFoundPageComponent
  // }
  
];

@NgModule({
  imports: [
    //RouterModule.forRoot(routes, {enableTracing: true}),  **Don't put this if you don't like confusing links.
  AdminSharedModule.forRoot(),
  ClientSharedModule.forRoot()
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//tolerable