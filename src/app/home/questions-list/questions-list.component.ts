import { Component, OnInit } from '@angular/core';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
declare var bootbox: any;
import { AddSubcategoryComponent } from '../add-subcategory/add-subcategory.component';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  constructor(
    private service: AuthService,
    private router: Router,
    private notifyService : NotificationService,
    public dialog: MatDialog,
    private activatedRoute : ActivatedRoute 
  ) { }
  ExamId:any="";
  questionList:any=[];
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      if(params.ExamId){
        this.ExamId = params.ExamId
      }
    })
    this.getTest();
  }
  getTest()
  {
    let data = {
      "exam_id": this.ExamId
    }
    this.service.getQuestion(data).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          this.questionList = response.data;
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
  OpenQuesAdd(){
    this.router.navigate(['/Home/add-question'],{queryParams: {ExamId: this.ExamId}});
  }
}
