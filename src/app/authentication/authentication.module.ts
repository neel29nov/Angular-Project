import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule }   from '@angular/forms';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [LoginComponent, MainComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
