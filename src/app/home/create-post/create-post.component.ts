import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainModulesComponent } from '../main-modules/main-modules.component';
import { AuthService } from '../home.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DashboardComponent>,
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService
  ) { }
  feedText= '';
image:any;
feedId=0
  ngOnInit(): void {
    if(this.dialogData.text)
    {
      this.feedText = this.dialogData.text;
    }
    
    if(this.dialogData.feed_id){
      this.feedId = this.dialogData.feed_id;
      if(this.dialogData.img)
      {
        var imgtag = <any>document.getElementById("UploadImg");
        imgtag.src = this.dialogData.img;
        this.image = this.dialogData.img;
      }
    }
    else{
      if(this.dialogData.img)
      {
        this.loadFile(this.dialogData.img)
      }
    }
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
  close(){
    this.dialogRef.close();
  }
  loadFile(fileInput: any) {
      this.image = fileInput.target.files[0];
      var selectedFile = this.image
      var reader = new FileReader();

      var imgtag = <any>document.getElementById("UploadImg");
      imgtag.title = selectedFile.name;

      reader.onload = function(event) {
        imgtag.src = event.target.result;
      };
       reader.readAsDataURL(selectedFile);
  }
  createPost(){
    if(this.feedId)
    {
      var formData: any = new FormData();
      formData.append('text', this.feedText)
      formData.append('image', this.image);
      formData.append('feed_id', this.feedId);
      this.loader=true;
      this.service.feedEdit(formData).subscribe(
        response => {
          this.loader=false;
          if (response.code == 200) {
            this.notifyService.showSuccess(response.message, '');
            this.dialogRef.close();
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
    else{
      var formData: any = new FormData();
      formData.append('text', this.feedText)
      formData.append('image', this.image);
      this.loader=true;
      this.service.feedCreate(formData).subscribe(
        response => {
          this.loader=false;
          if (response.code == 200) {
            this.notifyService.showSuccess(response.message, '');
            this.dialogRef.close();
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
}
