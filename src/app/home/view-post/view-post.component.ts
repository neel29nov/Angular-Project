import { Component, OnInit } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { apiUrl } from '../../shared/api.config';
declare var bootbox: any;

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private activatedRoute : ActivatedRoute,
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService
  ) { }
  feedId:any;
  globalBaseUrl = apiUrl.baseImageUrl;
  loader = false;
  postData:any;
  commentList:any;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      if(params.feedId){
        this.feedId = params.feedId;
        this.getPostDetails();
        this.getComments()
      }
    })
    
  }
  getComments(){
    let data ={
      "feed_id":this.feedId,
      "page":"1",
      "per_page":"10",
    }
    this.service.commentList(data).subscribe(
      response => {
        this.loader=false;
        if (response.code == 200) {
        this.commentList=response.data.lists.data;
          // this.notifyService.showSuccess(response.message, '');
          
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.loader=false;
        this.notifyService.showError(error.error.message, '')
      })
  }
  getPostDetails(){
    let data ={
      "feed_id":this.feedId
    }
    this.service.viewPost(data).subscribe(
      response => {
        this.loader=false;
        if (response.code == 200) {
        this.postData=response.data.lists;
          // this.notifyService.showSuccess(response.message, '');
          
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.loader=false;
        this.notifyService.showError(error.error.message, '')
      })
  }
  getTimeData(time)
  {
    let date = new Date(time);
    let currentDate = new Date;
    if(currentDate.getDate()-date.getDate() == 0)
    {
      if(currentDate.getHours()-date.getHours() == 0){
        if(currentDate.getMinutes()-date.getMinutes() == 0){
          return  "1 Minute"
        }
        else if(currentDate.getMinutes()-date.getMinutes() == 1){
          return  "1 Minute"
        }
        else{
          return currentDate.getMinutes()-date.getMinutes() + " Minutes"
        }
      }
      else if(currentDate.getHours()-date.getHours() == 1){
        return "1 Hour"
      }
      else{
        return currentDate.getHours()-date.getHours() + " Hours"
      }
    }
    else if(currentDate.getDate()-date.getDate() == 1){
      return "1 Day"
    }
    else{
      return currentDate.getDate()-date.getDate() +  " Days"
    }
  }
  LikeFeed(item,isLike){
    item.is_current_user_like =isLike;
    if(isLike)
    {
      item.feed_like_count = parseInt(item.feed_like_count) + 1;
    }
    else{
      item.feed_like_count = parseInt(item.feed_like_count) - 1;
    }
    let data = {
      "feed_id":item.feed_id,
      "user_id":localStorage.getItem("UserId"),
      "status":isLike
    }
    this.service.feedLike(data).subscribe(
      response => {
        this.loader=false;
        if (response.code == 200) {
          // this.notifyService.showSuccess(response.message, '');
          this.getPostDetails();
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.loader=false;
        this.notifyService.showError(error.error.message, '')
      })
  }
  addComment(index,obj)
  {
    var comment = <any>document.getElementsByClassName("commentText")[index];
    let data ={
      "feed_id":obj.feed_id,
     "text":comment.value
    };
    this.service.commentCreate(data).subscribe(
      response => {
        this.loader=false;
        if (response.code == 200) {
          // this.notifyService.showSuccess(response.message, '');
          this.getComments();
          comment.value=''
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.loader=false;
        this.notifyService.showError(error.error.message, '')
      })
  }
}
