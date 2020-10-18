import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { MainModulesComponent } from './main-modules/main-modules.component';
import { TableModule } from 'primeng/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AddModuleComponent } from './add-module/add-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule,  } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { TestListComponent } from './test-list/test-list.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreatePostComponent } from './create-post/create-post.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ViewPostComponent } from './view-post/view-post.component';

@NgModule({
  declarations: [DashboardComponent, MainModulesComponent, AddModuleComponent, CategoryListComponent, AddCategoryComponent, AddSubcategoryComponent, SubcategoryListComponent, CreateTestComponent, AddQuestionComponent, TestListComponent, QuestionsListComponent, CreatePostComponent, ViewPostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    CKEditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PickerModule
  ],
  exports:[
    
  ],
  entryComponents: [AddModuleComponent,AddCategoryComponent,AddSubcategoryComponent,CreatePostComponent]
})
export class HomeModule { }
