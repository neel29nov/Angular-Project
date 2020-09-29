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
  selectedModuleId: any;
  selectedCategoryId:any;
  moduleList: any[];
  categoryList: any[];
  ngOnInit(): void {
    if(this.dialogData.type == 'edit'){
      this.type= "Edit";
      this.id=this.dialogData.id;
      this.model.sub_category_name = this.dialogData.name;
    }
    else{
      this.type="Add";
      this.module_id = this.dialogData.module_id;
      this.selectedModuleId = this.module_id;
      this.category_id = this.dialogData.category_id
    }
    this.getModules();
    this.getCategory();
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
  getCategory(){
    let data = {
      "page":'',
      "per_page":'',
      "search":'',
      "sort":'',
      "module_id":this.selectedModuleId
    }
    this.service.getCategory(data).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          // response.data.lists.data.forEach(element => {
          //   this.rowdata.push(element);
          // });
          this.categoryList=response.data.lists.data;
          let id = <any>document.getElementById("categoryTextAdd2");
          let find = 0;
          this.categoryList.forEach(element => {
            if(element.id==this.category_id)
            {
              console.log(element.subject_name);
              id.value=element.subject_name;
              find=1
            }
          });
          if(!find)
          {
            id.value = this.categoryList[0].subject_name;
          }
          this.selectedCategoryId = this.category_id;
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
      value.category_id = this.selectedCategoryId;
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
  myFunctionAdd() {
    document.getElementById("myDropdownAdd").classList.toggle("show");
  }
  myFunction2Add(name,module_id) {
    let id = <any>document.getElementById("moduleTextAdd");
    id.value=name;
    this.selectedModuleId = module_id;
    this.getCategory();
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
  myFunctionAdd2() {
    document.getElementById("myDropdownAdd2").classList.toggle("show");
  }
  myFunction2Add2(name,module_id) {
    let id = <any>document.getElementById("categoryTextAdd2");
    id.value=name;
    this.selectedCategoryId = module_id;
    document.getElementById("myDropdownAdd2").classList.toggle("show");
  }
  
  filterFunctionAdd2() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInputAdd2");
    filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdownAdd2");
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
