import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainModulesComponent } from './main-modules/main-modules.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';


const routes: Routes = [
  {path: '', component : DashboardComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'module', component : MainModulesComponent},
  {path: 'category-list', component : CategoryListComponent},
  {path: 'subcategory-list', component : SubcategoryListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
