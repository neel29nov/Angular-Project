import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainModulesComponent } from './main-modules/main-modules.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { AddQuestionComponent } from './add-question/add-question.component';

const routes: Routes = [
  {path: '', component : DashboardComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'module', component : MainModulesComponent},
  {path: 'category-list', component : CategoryListComponent},
  {path: 'subcategory-list', component : SubcategoryListComponent},
  {path: 'create-test', component : CreateTestComponent},
  {path: 'add-question', component : AddQuestionComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
