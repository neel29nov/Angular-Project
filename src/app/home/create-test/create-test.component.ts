import { Component, OnInit } from '@angular/core';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
declare var bootbox: any;
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  constructor(
    private service: AuthService,
    private notifyService : NotificationService,
    public dialog: MatDialog
  ) { }
  moduleList:any[];
  selectedModuleId: any;
  categoryList:any[];
  selectedCategoryId:any;
  subCategoryList:any[];
  selectedSubCategory:any;
  model= {
    module_id:"",
	category_id:"",
	sub_category_id:"",
	test_name:'',
	no_of_ques:"",
	exam_time:"",
	publish_date:""
  }
  ngOnInit(): void {
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
          // let id = <any>document.getElementById("moduleText");
          // id.value=this.moduleList[0].module_name;
          // this.selectedModuleId = this.moduleList[0].id;
          // this.getCategory();
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
          // let id = <any>document.getElementById("categoryText");
          // id.value=this.CategoryList[0].subject_name;
          // this.selectedCategoryId = this.CategoryList[0].id;
          // this.getSubCategory();
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
  getSubCategory()
  {
    let data = {
      "page":'',
      "per_page":'',
      "search":'',
      "sort":'',
      "module_id":this.selectedModuleId,
      "category_id": this.selectedCategoryId
    }
    this.service.getSubCategory(data).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          // console.log(this.currentPage);
          // this.notifyService.showSuccess(response.message,'');
          this.subCategoryList = response.data.lists.data;
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.notifyService.showError(error.error.errorMessage, '');
      })
  }
  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  myFunction2(name,module_id) {
    let id = <any>document.getElementById("moduleText");
    id.value=name;
    this.selectedModuleId = module_id;
    this.getCategory();
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  filterFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdown");
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
  myFunction12() {
    document.getElementById("myDropdown2").classList.toggle("show");
  }
  myFunction22(name,module_id) {
    let id = <any>document.getElementById("categoryText");
    id.value=name;
    this.selectedCategoryId = module_id;
    this.getSubCategory();
    document.getElementById("myDropdown2").classList.toggle("show");
  }
  
  filterFunction2() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput2");
    filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdown2");
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
  myFunction13() {
    document.getElementById("myDropdown3").classList.toggle("show");
  }
  myFunction23(name,module_id) {
    let id = <any>document.getElementById("subcategoryText");
    id.value=name;
    this.selectedSubCategory = module_id;
    // this.getCategory();
    document.getElementById("myDropdown3").classList.toggle("show");
  }
  
  filterFunction3() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput3");
    filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdown3");
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
  onSubmit(values){
    values.module_id= this.selectedModuleId;
    values.category_id = this.selectedCategoryId;
    values.sub_category_id = this.selectedSubCategory;
    this.service.createTest(values).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          this.notifyService.showSuccess(response.message,'');
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.notifyService.showError(error.error.errorMessage, '');
      })
  }

}
