import { Component, OnInit } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';
import { apiUrl } from '../../shared/api.config';
declare var bootbox: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService
  ) { }
  feedText= '';
  image:any;
  feedList: any;
  fileInputImg:any;
  ngOnInit(): void {
    this.getFeedList();
  }
  globalBaseUrl = apiUrl.baseImageUrl;
  getFeedList(){
    this.service.feedList({}).subscribe(
      response => {
        this.loader=false;
        if (response.code == 200) {
          this.feedList = response.data.lists.data;
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
  OpenPostDialog(feedId?,feedText?,feedImg?){
    let dialogRef = this.dialog.open(CreatePostComponent, {
      data: {
        text:feedText?feedText:this.feedText,
        img:feedImg?feedImg:this.fileInputImg,
        feed_id: feedId?feedId:0
      },
      width: '680px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res =>{
      this.getFeedList();
    })
  }
  loader = false;
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(this.feedText)
    const { feedText } = this;
    console.log(feedText);
    console.log(`${event.emoji.native}`)
    const text = `${feedText}${event.emoji.native}`;

    this.feedText = text;
    
    // this.showEmojiPicker = false;
  }
  
  loadFile(fileInput: any) {
      this.image = fileInput.target.files[0];
      this.fileInputImg = fileInput;
      this.OpenPostDialog();
  }
  createPost(){
    var formData: any = new FormData();
    formData.append('text', this.feedText)
    formData.append('image', this.image);
    this.loader=true;
    this.service.feedCreate(formData).subscribe(
      response => {
        this.loader=false;
        if (response.code == 200) {
          this.getFeedList();
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
          this.getFeedList();
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
          this.getFeedList();
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
          return currentDate.getMinutes()-date.getMinutes() + "Minutes"
        }
      }
      else if(currentDate.getHours()-date.getHours() == 1){
        return "1 Hour"
      }
      else{
        return currentDate.getHours()-date.getHours() + "Hours"
      }
    }
    else if(currentDate.getDate()-date.getDate() == 1){
      return "1 Day"
    }
    else{
      return currentDate.getDate()-date.getDate() +  "Days"
    }
  }
  DeletePost(feed_id)
  {
    var that = this;
    bootbox.confirm({
      message: "Are you sure you want to delete this post?",
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
          that.loader=true;
          let data = {
            "feed_id":feed_id
          }
          that.service.feedDelete(data).subscribe(
            response => {
              that.loader=false;
              if (response.code == 200) {
                that.notifyService.showSuccess(response.message, '');
                that.getFeedList();
              }
              else {
                that.notifyService.showError(response.message, '');
              }
            },
            error => {
              that.loader=false;
              that.notifyService.showError(error.error.message, '')
            })
        }
      }
    });
    
  }
}
