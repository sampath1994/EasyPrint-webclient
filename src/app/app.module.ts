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
import { LivePanelComponent } from './live-panel/live-panel.component';
import { ModalComponent } from './directive/modal.component';
import { ModalService } from './service/modal.service';
import { RoleGuard } from './role.guard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { MessagingService } from './messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PrintComponent,
    MapComponent,
    PrintshopComponent,
    UserviewComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    LivePanelComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: `${key}` 
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AuthGuard,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    RoleGuard,
    AlertService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    //fakeBackendProvider,
    ModalService,
    MessagingService,
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
