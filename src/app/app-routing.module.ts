import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintComponent } from './print/print.component';

const routes: Routes = [
  { path: '', redirectTo: '/print', pathMatch: 'full' },
  { path: 'print', component: PrintComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
