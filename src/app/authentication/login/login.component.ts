import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService) { }

  ngOnInit(): void {
  }
  model = {
    email: '',
    password: ''
  }
  onSubmit(value) {
    this.service.Login(value).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          localStorage.setItem('authToken',response.data.token);
          localStorage.setItem('userType',"1");
          localStorage.setItem('UserId',response.data.id);
          this.notifyService.showSuccess(response.message,'');
          this.router.navigate(['/Home/dashboard']);
        }
        else {
          this.notifyService.showError(response.errorMessage, '');
        }
      },
      error => {
        this.notifyService.showError(error.error.errorMessage, '');
      })
  }

}
