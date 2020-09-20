import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModuleComponent } from '../add-module/add-module.component';

@Component({
  selector: 'app-main-modules',
  templateUrl: './main-modules.component.html',
  styleUrls: ['./main-modules.component.css']
})
export class MainModulesComponent implements OnInit {
  @ViewChild('dt') table: Table;
  cols: any[];
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
      },
      height: '100vh',
      width: '680px',
      disableClose: true
    });
  }

}
