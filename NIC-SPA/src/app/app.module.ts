import { AdminSharedModule } from './../../projects/admin/src/app/app.module';
import { ClientSharedModule } from './../../projects/client/src/app/app.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientSharedModule.forRoot(),
    AdminSharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
