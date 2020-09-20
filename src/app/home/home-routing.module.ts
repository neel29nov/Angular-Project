import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainModulesComponent } from './main-modules/main-modules.component';



const routes: Routes = [
  {path: '', component : DashboardComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'module', component : MainModulesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
