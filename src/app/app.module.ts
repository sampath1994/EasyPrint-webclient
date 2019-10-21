import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrintComponent } from './print/print.component';
import { AppRoutingModule } from './/app-routing.module';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { PrintshopComponent } from './printshop/printshop.component';
import { UserviewComponent } from './userview/userview.component';

@NgModule({
  declarations: [
    AppComponent,
    PrintComponent,
    MapComponent,
    PrintshopComponent,
    UserviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ''
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
