import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainModulesComponent } from '../main-modules/main-modules.component';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<MainModulesComponent>,
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService
  ) { }
  model = {
    module_name: ''
  }
  type:any;
  id:any;
  ngOnInit(): void {
    if(this.dialogData.type == 'edit'){
      this.type= "Edit";
      this.id=this.dialogData.id;
      this.model.module_name = this.dialogData.name;
    }
    else{
      this.type="Add";
    }
  }
  onSubmit(value) {
    if(this.type=="Add")
    {
    this.service.createModule(value).subscribe(
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
        "module_name":this.model.module_name,
	      "module_id":this.id
      }
      this.service.updateModule(data).subscribe(
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
