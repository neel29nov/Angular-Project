import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule }   from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [LoginComponent, MainComponent, SignupComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
