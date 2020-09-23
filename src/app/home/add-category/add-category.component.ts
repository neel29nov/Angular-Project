import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<CategoryListComponent>,
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService
  ) { }
  model = {
    subject_name: '',
    module_id: ''
  }
  type:any;
  id:any;
  module_id:any;
  ngOnInit(): void {
    if(this.dialogData.type == 'edit'){
      this.type= "Edit";
      this.id=this.dialogData.id;
      this.model.subject_name = this.dialogData.name;
    }
    else{
      this.type="Add";
      this.module_id = this.dialogData.module_id;
    }
  }
  onSubmit(value) {
    if(this.type=="Add")
    {
      value.module_id = this.module_id;
    this.service.createCategory(value).subscribe(
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
        "subject_name":this.model.subject_name,
	      "category_id":this.id
      }
      this.service.editCategory(data).subscribe(
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
