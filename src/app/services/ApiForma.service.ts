import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CreaeditaformasComponent } from '../components/formas/creaeditaformas/creaeditaformas.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    CreaeditaformasComponent
  ],
  providers: [],
  // bootstrap: [CreaeditaformasComponent] 
})
export class AppModule { }
