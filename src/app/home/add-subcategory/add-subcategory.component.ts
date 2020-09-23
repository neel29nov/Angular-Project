import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { SubcategoryListComponent } from '../subcategory-list/subcategory-list.component';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  public dialogRef: MatDialogRef<SubcategoryListComponent>,
  private notifyService : NotificationService,
  private router: Router,
  private service: AuthService) { }
  model = {
    sub_category_name: '',
    module_id: '',
    category_id:''
  }
  type:any;
  id:any;
  module_id:any;
  category_id: any;
  ngOnInit(): void {
    if(this.dialogData.type == 'edit'){
      this.type= "Edit";
      this.id=this.dialogData.id;
      this.model.sub_category_name = this.dialogData.name;
    }
    else{
      this.type="Add";
      this.module_id = this.dialogData.module_id;
      this.category_id = this.dialogData.category_id
    }
  }
  onSubmit(value) {
    if(this.type=="Add")
    {
      value.module_id = this.module_id;
      value.category_id = this.category_id;
    this.service.createSubCategory(value).subscribe(
      response => {
        if (response.code == 200) {
          this.notifyService.showSuccess(response.message,'');
          this.dialogRef.close();
        }
        else {
          this.notifyService.showError(response.errorMessage, '');
        }
      },
      error => {
        this.notifyService.showError(error.error.errorMessage, '');
      })
    }
    else{
      let data ={
        "sub_category_name":this.model.sub_category_name,
	      "sub_category_id":this.id
      }
      this.service.editSubCategory(data).subscribe(
        response => {
          if (response.code == 200) {
            this.notifyService.showSuccess(response.message,'');
            this.dialogRef.close();
          }
          else {
            this.notifyService.showError(response.errorMessage, '');
          }
        },
        error => {
          this.notifyService.showError(error.error.errorMessage, '');
        })
    }
  }
  Close(){
    this.dialogRef.close();
  }

}
