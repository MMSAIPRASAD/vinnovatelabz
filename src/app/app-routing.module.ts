import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: 'dashboard', 
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
 },
  
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
