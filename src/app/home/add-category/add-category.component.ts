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
  moduleList: any[];
  selectedModuleId: any;
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
    this.getModules();
  }
  getModules(){
    let data = {
      "page":'',
      "per_page":'',
      "search":'',
      "sort":''
    }
    this.service.getModule(data).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          // response.data.lists.data.forEach(element => {
          //   this.rowdata.push(element);
          // });
          this.moduleList=response.data.lists.data;
          let id = <any>document.getElementById("moduleTextAdd");
          console.log(this.module_id);
          this.moduleList.forEach(element => {
            if(element.id==this.module_id)
            {
              console.log(element.module_name);
              id.value=element.module_name;
            }
          });
          
          this.selectedModuleId = this.module_id;
          // console.log(this.currentPage);
          // this.notifyService.showSuccess(response.message,'');
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.notifyService.showError(error.error.errorMessage, '');
      })
  }
  onSubmit(value) {
    if(this.type=="Add")
    {
      value.module_id = this.selectedModuleId;
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
  myFunctionAdd() {
    document.getElementById("myDropdownAdd").classList.toggle("show");
  }
  myFunction2Add(name,module_id) {
    let id = <any>document.getElementById("moduleTextAdd");
    id.value=name;
    this.selectedModuleId = module_id;
    document.getElementById("myDropdownAdd").classList.toggle("show");
  }
  
  filterFunctionAdd() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInputAdd");
    filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdownAdd");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

}
