import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModuleComponent } from '../add-module/add-module.component';
declare var bootbox: any;
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Module {
  module_name: string,
  module_id: number
}
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  cols: any[];
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
  selectedModule: any;
  
  moduleList: any;
  filteredOptions: Observable<Module[]>;
  constructor(
    private service: AuthService,
    private notifyService : NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pageSize=10;
    this.currentPage=1;
    this.search='';
    this.sort='';
    this.getCategory();
    this.getModules();
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
    this.service.getModule(this.data).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          // response.data.lists.data.forEach(element => {
          //   this.rowdata.push(element);
          // });
          this.moduleList=response.data.lists.data;
          
          this.selectedModule = "abc";
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
  getCategory()
  {
    this.data = {
      "page":this.currentPage,
      "per_page":this.pageSize,
      "search":this.search,
      "sort":this.sort,
      "module_id":"2"
    }
    this.service.getCategory(this.data).subscribe(
      response => {
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
    this.getCategory();
  }
  ClearSearch()
  {
    let searchtext=<any>document.getElementById("SearchText");
    searchtext.value='';
    this.search='';
    this.getCategory();
  }
  Search()
  {
    let searchtext=<any>document.getElementById("SearchText");
    this.search=searchtext.value;
    this.getCategory();
  }
  OpenAddModule()
  {
    let dialogRef = this.dialog.open(AddModuleComponent, {
      data: {
        type : 'add'
      },
      width: '680px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res =>{
      this.getCategory();
    })
  }
  Edit(name,id){
    let dialogRef = this.dialog.open(AddModuleComponent, {
      data: {
        type : 'edit',
        name: name,
        id:id
      },
      width: '680px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res =>{
      this.getCategory();
    })
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
            "module_id":id
          }
          that.service.deleteModule(data).subscribe(
            response => {
              if (response.code == 200) {
                that.notifyService.showSuccess(response.message, '');
                that.getCategory();
              }
              else {
                that.notifyService.showError(response.errorMessage, '');
              }
            },
            error => {
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
    this.getCategory();
  }
  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  myFunction2(name) {
    let id = <any>document.getElementById("moduleText");
    id.value=name;
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

}
