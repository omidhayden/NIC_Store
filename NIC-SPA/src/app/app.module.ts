import { AlertifyService } from './alertify.service';
import {  HttpClientModule } from '@angular/common/http';
import { AdminSharedModule } from './../../projects/admin/src/app/app.module';
import { ClientSharedModule } from './../../projects/client/src/app/app.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,

    ClientSharedModule.forRoot(),
    AdminSharedModule.forRoot()
 
   ],
  providers: [
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
