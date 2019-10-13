import { ErrorInterceptorProvider } from './interceptor/error.interceptor';
import { AlertifyService } from './alertify.service';
import {  HttpClientModule } from '@angular/common/http';
import { AdminSharedModule } from './../../projects/admin/src/app/app.module';
import { ClientSharedModule } from './../../projects/client/src/app/app.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function tokenGetter(){
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,

    ClientSharedModule.forRoot(),
    AdminSharedModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        whitelistedDomains:['localhost:5000'],
        blacklistedRoutes:['localhost:5000/api/auth']
      }
    }),
    BrowserAnimationsModule
   ],
  providers: [
    AlertifyService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
