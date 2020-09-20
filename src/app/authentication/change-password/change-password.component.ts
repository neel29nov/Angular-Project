import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../shared/toastr-notification/notification.service';
import { Router , ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private notifyService : NotificationService,
    private router: Router,
    private service: AuthService,
    private activatedRoute : ActivatedRoute
  ) { }
  model = {
    password: '',
    cpassword:'',
    userId:'',
    token:''
  }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => 
      this.model.token = params["token"]  
    )
    this.activatedRoute.queryParams.subscribe(params => 
      this.model.userId = params["id"]      
    )
    console.log(this.model);
  }
  passwordType="password";
  cpasswordType="password";
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
