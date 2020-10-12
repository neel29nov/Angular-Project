import { Component, OnInit } from '@angular/core';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
declare var bootbox: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(
    private activatedRoute : ActivatedRoute,
    private service: AuthService,
    private router: Router,
    private notifyService : NotificationService,
  ) { }
  isMultiple:any=0;
  ExamId: any;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      if(params.ExamId){
        this.ExamId = params.ExamId
      }
    })
    for(let i=0;i<5;i++)
    {
      this.model.answer[i]="";
      this.model.correct_ans[i]=0;
    }
    this.model.type=0;
    this.model.correct_ans[0]=1;
  }
  public onChange( { editor }: ChangeEvent , value) {
    const data = editor.getData();
    if(value<0)
    {
      this.model.ques=data;
    }
    else{
      this.model.answer[value]=data;
    }
}
  public model: any = {
    "exam_id":"",
    "ques":'',
    "answer":[],
    "type":"",
    "image_ques":"",
    "image_ans":[],
    "correct_ans":[]
  }
  loadFile(fileInput: any,value) {
    console.log(fileInput.target.files[0])
    if(value==5){
      this.model.image_ques = fileInput.target.files[0];
      
    } 
    else{
      this.model.image_ans[value] = fileInput.target.files[0];
    }    
  }
  submitForm(formValue){
    
    let a = <any>document.getElementById("inlineRadio2");
    let b = <any>document.getElementById("inlineRadio1");
    let c = <any>document.getElementsByName("inlineRadioOptions2");
    let d = <any>document.getElementsByName("inlinecheckOptions");
    if(a.checked)
    {
      this.model.type=0;
      for(let i=0; i<5;i++){
        if(c[i].checked){
          this.model.correct_ans[i]=1
        }
      }
    }
    else{
      this.model.type=1;
      for(let i=0; i<5;i++){
        if(d[i].checked){
          this.model.correct_ans[i]=1
        }
      }
    }
    var formData: any = new FormData();
    formData.append('exam_id', this.ExamId)
    formData.append('ques', formValue.ques)
    for(let i=0;i<5;i++)
    {
      formData.append('answer['+i+']', formValue.answer[i])
      formData.append('correct_ans['+i+']', this.model.correct_ans[i])
      formData.append('image_ans['+i+']', this.model.image_ans[i])
    }
    formData.append('type', this.model.type)
    formData.append('image_ques', this.model.image_ques)
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    
    this.service.addQuestion(formData).subscribe(
      response => {
        if (response.code == 200) {
          this.notifyService.showSuccess(response.message, '');
          this.router.navigate(['/Home/question-list'],{queryParams: {ExamId: this.ExamId}});
        }
        else {
          this.notifyService.showError(response.errorMessage, '');
        }
      },
      error => {
        this.notifyService.showError(error.error.errorMessage, '')
      })
  }
  close(){
    this.router.navigate(['/Home/question-list'],{queryParams: {ExamId: this.ExamId}});
  }
}
