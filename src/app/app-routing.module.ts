import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintComponent } from './print/print.component';
import {PrintshopComponent} from './printshop/printshop.component';
import {UserviewComponent} from './userview/userview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'print', component: PrintComponent },
  { path: 'shop', component: PrintshopComponent, canActivate: [RoleGuard], data: { 
    expectedRole: 'ROLE_CLIENT'
  } },
  { path: 'user', component: UserviewComponent, canActivate: [RoleGuard], data: { 
    expectedRole: 'ROLE_USER'
  } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
