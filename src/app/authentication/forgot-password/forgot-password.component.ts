import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService
  ) { }
  model = {
    email: ''
  }
  ngOnInit(): void {
  }
  onSubmit(value) {
    this.service.ForgotPassword(value).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          this.notifyService.showSuccess(response.message,'');
          this.router.navigate(['/authentication/login']);
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
