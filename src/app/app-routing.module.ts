import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintComponent } from './print/print.component';
import {PrintshopComponent} from './printshop/printshop.component';
import {UserviewComponent} from './userview/userview.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'print', component: PrintComponent },
  { path: 'shop', component: PrintshopComponent },
  { path: 'user', component: UserviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
