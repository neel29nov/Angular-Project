import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService
  ) { }

  ngOnInit(): void {
  }
  model = {
    email: '',
    password: '',
    cpassword: '',
    name:'',
    phone:'',
    type:'1'
  }
  passwordType="password";
  cpasswordType="password";
  onSubmit(value) {
    this.service.Signup(value).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          this.notifyService.showSuccess(response.message,'');
          this.router.navigate(['/Home/dashboard']);
        }
        else {
          this.notifyService.showError(response.message, '');
        }
      },
      error => {
        this.notifyService.showError(error.error.errorMessage, '');
      })
  }
  choose(event)
  {
    console.log(event);
  }
}
