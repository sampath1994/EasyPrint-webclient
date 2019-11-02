import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrintComponent } from './print/print.component';
import { AppRoutingModule } from './/app-routing.module';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { PrintshopComponent } from './printshop/printshop.component';
import { UserviewComponent } from './userview/userview.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from './authentication.service';
import {AlertService} from './alert.service';

import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from '../helpers/error.interceptor';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { key } from '../secret/api_key';
// used to create fake backend
import { fakeBackendProvider } from '../helpers/fake-backend';

@NgModule({
  declarations: [
    AppComponent,
    PrintComponent,
    MapComponent,
    PrintshopComponent,
    UserviewComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: `${key}`   //'AIzaSyCw3UUAMrndVhq3TzkaRxJiKoCO_HP26w8'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
