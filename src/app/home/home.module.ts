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
import { FormsModule }   from '@angular/forms';
import { AddModuleComponent } from './add-module/add-module.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DashboardComponent, MainModulesComponent, AddModuleComponent],
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
    MatDialogModule
  ],
  exports:[
    
  ]
})
export class HomeModule { }
