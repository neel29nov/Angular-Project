import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModuleComponent } from '../add-module/add-module.component';
declare var bootbox: any;

@Component({
  selector: 'app-main-modules',
  templateUrl: './main-modules.component.html',
  styleUrls: ['./main-modules.component.css']
})
export class MainModulesComponent implements OnInit {
  @ViewChild('dt') table: Table;
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
  isActive=1;
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
    this.getmodules();
    for(let i=0;i<2;i++)
    {
      this.sortArrow[i]=0;
    }
    
  }
  getmodules()
  {
    this.data = {
      "page":this.currentPage,
      "per_page":this.pageSize,
      "search":this.search,
      "sort":this.sort
    }
    this.service.getModule(this.data).subscribe(
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
    this.getmodules();
  }
  ClearSearch()
  {
    let searchtext=<any>document.getElementById("SearchText");
    searchtext.value='';
    this.search='';
    this.getmodules();
  }
  Search()
  {
    let searchtext=<any>document.getElementById("SearchText");
    this.search=searchtext.value;
    this.getmodules();
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
      this.getmodules();
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
      this.getmodules();
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
                that.getmodules();
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
    this.getmodules();
  }

}
