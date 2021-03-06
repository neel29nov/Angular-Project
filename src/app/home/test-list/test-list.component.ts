import { Component, OnInit } from '@angular/core';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
declare var bootbox: any;
import { AddSubcategoryComponent } from '../add-subcategory/add-subcategory.component';
declare var $:any;
@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  cols: any[];
  maxDate: Date;
  sortArrow=[];
  pageSize : any;
  currentPage : any;
  totalSize : any;
  pageCount=[];
  value = '';
  search:any;
  sort:any;
  data:any;
  isPrev=0;
  isNext=0;
  rowdata=[];
  isActive = 1;
  selectedModuleId: any="";
  moduleList: any;
  selectedCategoryId: any="";
  CategoryList: any;
  selectedSubCategoryId:any="";
  subCategoryList:any;
  startDate:any="";
  endDate:any="";
  loader = false;
  constructor(
    private service: AuthService,
    private router: Router,
    private notifyService : NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pageSize=10;
    this.currentPage=1;
    this.search='';
    this.sort='';
    this.getModules();
    this.getTest();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const todayDate = new Date().getDate();
    this.maxDate = new Date(currentYear, currentMonth, todayDate);
    
    
    for(let i=0;i<2;i++)
    {
      this.sortArrow[i]=0;
    }
  }

  getModules(){
    this.data = {
      "page":'',
      "per_page":'',
      "search":'',
      "sort":''
    }
    this.loader=true;
    this.service.getModule(this.data).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          this.loader=false;
          // response.data.lists.data.forEach(element => {
          //   this.rowdata.push(element);
          // });
          this.moduleList=response.data.lists.data;
          // let id = <any>document.getElementById("moduleText");
          // id.value=this.moduleList[0].module_name;
          // this.selectedModuleId = this.moduleList[0].id;
          // this.getCategory();
          this.getTest();
          // console.log(this.currentPage);
          // this.notifyService.showSuccess(response.message,'');
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.loader=false;
        this.notifyService.showError(error.error.errorMessage, '');
      })
  }
  getCategory(){
    this.data = {
      "page":'',
      "per_page":'',
      "search":'',
      "sort":'',
      "module_id":this.selectedModuleId
    }
    this.loader=true;
    this.service.getCategory(this.data).subscribe(
      response => {
        this.loader=false;
        console.log(response);
        if (response.code == 200) {
          // response.data.lists.data.forEach(element => {
          //   this.rowdata.push(element);
          // });
          this.CategoryList=response.data.lists.data;
          // let id = <any>document.getElementById("categoryText");
          // id.value=this.CategoryList[0].subject_name;
          // this.selectedCategoryId = this.CategoryList[0].id;
          // this.getSubCategory();
          this.getTest();
          // console.log(this.currentPage);
          // this.notifyService.showSuccess(response.message,'');
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.loader=false;
        this.notifyService.showError(error.error.errorMessage, '');
      })
  }
  getSubCategory()
  {
    this.data = {
      "page":'',
      "per_page":'',
      "search":'',
      "sort":'',
      "module_id":this.selectedModuleId,
      "category_id": this.selectedCategoryId
    }
    this.loader=true;
    this.service.getSubCategory(this.data).subscribe(
      response => {
        this.loader=false;
        console.log(response);
        if (response.code == 200) {
          // response.data.lists.data.forEach(element => {
          //   this.rowdata.push(element);
          // });
          this.subCategoryList=response.data.lists.data;
          // let id = <any>document.getElementById("subcategoryText");
          // id.value=this.subCategoryList[0].sub_category_name;
          // this.selectedSubCategoryId = this.subCategoryList[0].id;
             this.getTest();
          // console.log(this.currentPage);
          // this.notifyService.showSuccess(response.message,'');
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.loader=false;
        this.notifyService.showError(error.error.errorMessage, '');
      })
  }
  getTest()
  {
    let fromDate, toDate;
    if(this.startDate && this.endDate){
      fromDate = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
      toDate = this.endDate.getFullYear() + '-' + (this.endDate.getMonth() + 1) + '-' + this.endDate.getDate();
    }
    else{
      fromDate = '';
      toDate = '';
    }
    let data = {
      "page":this.currentPage,
      "per_page":this.pageSize,
      "search":this.search,
      "sort":this.sort,
      "module_id":this.selectedModuleId,
      "category_id": this.selectedCategoryId,
      "subcategory_id": this.selectedSubCategoryId,
      "start_date":this.startDate,
      "end_date":this.endDate
    }
    this.loader=true;
    this.service.getTest(data).subscribe(
      response => {
        this.loader=false;
        console.log(response);
        if (response.code == 200) {
          // response.data.lists.data.forEach(element => {
          //   this.rowdata.push(element);
          // });
          this.rowdata=response.data.lists.data;
          this.currentPage=response.data.lists.current_page;
          this.pageSize=10;
          this.totalSize=response.data.lists.page_count;
          this.pageCount=[];
          if(this.currentPage==this.totalSize)
          {
              this.isNext=0;
          }
          else{
                this.isNext=1;
          }             
          
          for(let i=1; i<=response.data.lists.page_count;i++)
          {
              
              this.pageCount.push(i);
          }
          console.log(this.pageCount)
          // console.log(this.currentPage);
          // this.notifyService.showSuccess(response.message,'');
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.loader=false;
        this.notifyService.showError(error.error.errorMessage, '');
      })
    
  }
  handlePage(number) {
    if(number!=1)
    {
      this.isPrev=1
    }
    else{
      this.isPrev=0
    }
    if(number==this.totalSize)
    {
        this.isNext=0;
    }
    else{
          this.isNext=1;
    }
    this.currentPage = number;
    this.isActive = number;
    this.getSubCategory();
  }
  ClearSearch()
  {
    let searchtext=<any>document.getElementById("SearchText");
    searchtext.value='';
    this.search='';
    this.getSubCategory();
  }
  Search()
  {
    let searchtext=<any>document.getElementById("SearchText");
    this.search=searchtext.value;
    this.getSubCategory();
  }
  OpenAddModule()
  {
    this.router.navigate(['/Home/create-test']);
  }
  Edit(id){
    this.router.navigate(['/Home/create-test'],{queryParams: {TestId: id}});
  }
  Delete(id){
    var that = this;
    bootbox.confirm({
      message: "Are you sure you want to remove this Module?",
      buttons: {
        confirm: {
          label: 'Yes',
          className: 'btn-success'
        },
        cancel: {
          label: 'No',
          className: 'btn-danger'
        }
      },
      callback: function (result) {
        if (result) {
         let data ={
            "category_id":id
          }
          that.loader=true;
          that.service.deleteCategory(data).subscribe(
            response => {
              that.loader=true;
              if (response.code == 200) {
                that.notifyService.showSuccess(response.message, '');
                that.getSubCategory();
              }
              else {
                that.notifyService.showError(response.errorMessage, '');
              }
            },
            error => {
              that.loader=false;
              that.notifyService.showError(error.error.errorMessage, '');
            }
          )
        }
      }
    });
  }
  sorting(type,item){
    this.sortArrow[item]=!this.sortArrow[item];
    this.sort=type;
    this.getSubCategory();
  }
  clearDate(event) {
    event.stopPropagation();
    this.startDate = null;
    this.endDate = null;
    this.getTest();
  }
  OpenQuesList(testId){
    this.router.navigate(['/Home/question-list'],{queryParams: {ExamId: testId}});
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
  myFunctionC() {
    document.getElementById("myDropdownC").classList.toggle("show");
  }
  myFunction2C(name,category_id) {
    let id = <any>document.getElementById("categoryText");
    id.value=name;
    this.selectedCategoryId = category_id;
    this.getSubCategory();
    document.getElementById("myDropdownC").classList.toggle("show");
  }
  
  filterFunctionC() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInputC");
    filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdownC");
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
  myFunctionS() {
    document.getElementById("myDropdownS").classList.toggle("show");
  }
  myFunction2S(name,category_id) {
    let id = <any>document.getElementById("subcategoryText");
    id.value=name;
    this.selectedSubCategoryId = category_id;
    this.getTest();
    document.getElementById("myDropdownS").classList.toggle("show");
  }
  
  filterFunctionS() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInputS");
    filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdownS");
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
