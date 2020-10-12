import { Component, OnInit } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';

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
  ngOnInit(): void {
    this.getFeedList();
  }
  getFeedList(){
    this.service.feedList({}).subscribe(
      response => {
        this.loader=false;
        if (response.code == 200) {
          this.feedList = response.data.lists.data;
          this.notifyService.showSuccess(response.message, '');
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
  OpenPostDialog(){
    let dialogRef = this.dialog.open(CreatePostComponent, {
      data: {
      },
      width: '680px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res =>{
      // this.getmodules();
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
          this.notifyService.showSuccess(response.message, '');
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
